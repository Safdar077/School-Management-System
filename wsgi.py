from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello from Django backend!")

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'university_backend.settings')

application = get_wsgi_application()
