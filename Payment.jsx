import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';

const Payment = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [paymentId, setPaymentId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(''); // '', 'pending', 'paid'


  const upiLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR`;   // upi://pay?pa=arzanchivilkar1902@okaxis&pn=Arzan&am=500&cu=INR


  // Submit payment to backend
  const handleSubmitPayment = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/submit_payment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, amount }),
      });
      const result = await res.json();  //Converts the backend reply into a JavaScript object.
      if (!res.ok) {
        alert('Error: ' + result.message);
      } else {
        console.log('Payment stored:', result.message);
        if (result.payment_id) {
          setPaymentId(result.payment_id);
          setPaymentStatus('pending');
          setToastMessage('✅ Payment QR generated successfully!');
          setShowToast(true);
        }
      }
    } catch (error) {
      alert('Failed to submit payment data');
      console.error(error);
    }
  };

  // Poll backend to check payment status every 3 seconds when paymentId is set and status is pending
  useEffect(() => {
    let intervalId;
    if (paymentId && paymentStatus === 'pending') {
      intervalId = setInterval(async () => {
        try {
          const res = await fetch(`http://localhost:8000/api/payment_status/${paymentId}/`); //check paymentid status from backend
          if (res.ok) {
            const data = await res.json();
            if (data.status === 'completed' || data.status === 'paid') {
              setPaymentStatus('paid');
              setToastMessage('🎉 Your payment is successful!');
              setShowToast(true);
              clearInterval(intervalId);
            }
          } else {
            console.error('Failed to fetch payment status');
          }
        } catch (error) {
          console.error('Error fetching payment status:', error);
        }
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [paymentId, paymentStatus]); // its run until its not get paymentid and paymentstatus


  // Handle pay button click
  const handlePay = () => {
    if (name && amount) {
      setShowQR(true);
      handleSubmitPayment(); // Submit payment and trigger success toast after confirmation
    } else {
      alert('Please enter your name and amount!');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: '30rem', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
        <Card.Body>  
          <Card.Title className="text-center mb-4">💸 Pay with UPI</Card.Title>
          <Form>
            
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" className="w-100" onClick={handlePay}>
              Generate Payment QR
            </Button>
          </Form>

          {/*show QR code */}
          {showQR && (
            <div className="text-center mt-4">
              <QRCodeCanvas value={upiLink} size={180} />
              <p className="mt-3">
                Scan to pay ₹{amount} to {name}
              </p>
            </div>
          )}
        </Card.Body>
      </Card>

      <ToastContainer position="top-center" className="p-3">
  <Toast 
    onClose={() => setShowToast(false)} 
    show={showToast} 
    delay={3000} 
    autohide 
    bg="success"
  >
    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
  </Toast>
</ToastContainer>

    </div>
  );
};

export default Payment;
