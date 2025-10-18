from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
from bson import ObjectId
from bson.errors import InvalidId
from datetime import datetime
import json



#     ----------------------XXXXXXX----------------------
#jsonResponse  sends back data in JSON (example: { "message": "Hello" }).
#csrf_exempt  allows us to call this API without CSRF token (useful for APIs).
#MongoClient  connects Python to MongoDB database.
#ObjectId  helps handle MongoDB’s special _id field.  "_id": ObjectId("64f9b7e85c9c4c91a3f5d1a1"),
#InvalidId  catches errors when an ID is not valid.    check for _id is correct formate or not,
#datetime  used to store date/time (like when a user registered).
#json  used to convert request body (raw JSON) into Python dictionary.




# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["school"]

users_collection = db["users"]
admissions_collection = db["admissions"]
payments_collection = db["payments"]

# ----- USERS -----
@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            password = data.get("password")

            if not name or not email or not password:
                return JsonResponse({"message": "Name, email, and password are required"}, status=400)

            # Check if email already exists
            if users_collection.find_one({"email": email}):
                return JsonResponse({"message": "Email already registered"}, status=400)

            user_doc = {
                "name": name,
                "email": email,
                "password": password,
                "registered_at": datetime.utcnow()
            }
            users_collection.insert_one(user_doc)
            return JsonResponse({"message": "User registered successfully"}, status=201)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    return JsonResponse({"message": "Only POST allowed"}, status=405)


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            if not email or not password:
                return JsonResponse({"message": "Missing email or password"}, status=400)

            user = users_collection.find_one({"email": email})
            if user and user.get("password") == password:
                return JsonResponse(
                    {"message": "Login successful", "user": {"email": email, "name": user.get("name")}}, 
                    status=200
                )
            return JsonResponse({"message": "Invalid email or password"}, status=401)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    return JsonResponse({"message": "Only POST allowed"}, status=405)

def get_payment_status(request, payment_id):
    if request.method == "GET":
        try:
            payment = payments_collection.find_one({"_id": ObjectId(payment_id)})
            if not payment:
                return JsonResponse({"message": "Payment not found"}, status=404)
            return JsonResponse({
                "payment_id": str(payment["_id"]),
                "status": payment.get("status", "unknown")
            })
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    return JsonResponse({"message": "Only GET allowed"}, status=405)


# ----- ADMISSIONS -----
@csrf_exempt
def submit_admission(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            admission_doc = {
                "fullName": data.get("fullName"),
                "lastName": data.get("lastName"),
                "dob": data.get("dob"),
                "gender": data.get("gender"),
                "email": data.get("email"),
                "phone": data.get("phone"),
                "nationality": data.get("nationality"),
                "submitted_at": datetime.now()
            }
            admissions_collection.insert_one(admission_doc)
            return JsonResponse({"message": "Admission submitted"}, status=201)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    return JsonResponse({"message": "Only POST allowed"}, status=405)


def get_all_admissions(request):
    if request.method == "GET":
        admissions = list(admissions_collection.find({}, {"_id": 0}))
        return JsonResponse(admissions, safe=False)
    return JsonResponse({"message": "Only GET allowed"}, status=405)

# ----- PAYMENTS (OFFLINE MODE ONLY) -----
@csrf_exempt
def submit_payment(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            amount = data.get("amount")

            if not name or not amount:
                return JsonResponse({"message": "Name and amount required"}, status=400)

            payment_doc = {
                "name": name,
                "amount": float(amount),
                "status": "pending",
               "created_at": datetime.now()
            }
            result = payments_collection.insert_one(payment_doc)
            return JsonResponse({"message": "Payment submitted", "payment_id": str(result.inserted_id)}, status=201)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    return JsonResponse({"message": "Only POST allowed"}, status=405)


def get_all_payments(request):
    if request.method == "GET":
        payments = list(payments_collection.find({}))
        for p in payments:
            p["_id"] = str(p["_id"])
        return JsonResponse(payments, safe=False)
    return JsonResponse({"message": "Only GET allowed"}, status=405)


@csrf_exempt
def confirm_payment(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            payment_id = data.get("payment_id")
            if not payment_id:
                return JsonResponse({"message": "Payment ID required"}, status=400)

            result = payments_collection.update_one(
                {"_id": ObjectId(payment_id)},
                {"$set": {"status": "completed", "paid_at": datetime.utcnow()}}
            )
            if result.matched_count == 0:
                return JsonResponse({"message": "Payment not found"}, status=404)

            return JsonResponse({"message": "Payment confirmed"}, status=200)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    return JsonResponse({"message": "Only POST allowed"}, status=405)
