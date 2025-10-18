import React, { useEffect, useState } from "react";
import { Table, Button, Container, Card, Tabs, Tab, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

function AdminPage() {
  const [admissions, setAdmissions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //  Login check
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin@gmail.com" && password === "admin2006") {
      setLoggedIn(true);
      setError("");
    } else {
      setError(" Invalid username or password");
    }
  };

  // Fetch admissions
  const fetchAdmissions = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admissions/");
      const data = await res.json();
      setAdmissions(data);
    } catch (err) {
      console.error("Error fetching admissions", err);
    }
  };

  // Fetch payments
  const fetchPayments = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/payments/");
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      console.error("Error fetching payments", err);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchAdmissions();
      fetchPayments();
    }
  }, [loggedIn]);

  // Confirm payment
  const handleConfirm = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/confirm_payment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_id: id }),
      });
      if (res.ok) {
        alert("Payment confirmed!");
        fetchPayments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // if not logged in → show login form
  if (!loggedIn) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
          <h3 className="text-center mb-4">🔑 Admin Login</h3>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p className="text-danger text-center">{error}</p>}

            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>
        </Card>
      </Container>
    );
  }

  // if logged in → show dashboard
  return (
    <Container className="mt-5">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-lg p-4 rounded-4">
          <h2 className="text-center mb-4">📊 Admin Dashboard</h2>

          <Tabs defaultActiveKey="admissions" className="mb-3">
            {/* admissions Tab */}
            <Tab eventKey="admissions" title="Admissions">
              <Table striped bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>Full Name</th>
                    <th>DOB</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Nationality</th>
                    <th>Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((a, idx) => (
                    <tr key={idx}>
                      <td>{a.fullName} {a.lastName}</td>
                      <td>{a.dob}</td>
                      <td>{a.gender}</td>
                      <td>{a.email}</td>
                      <td>{a.phone}</td>
                      <td>{a.nationality}</td>
                      <td>{new Date(a.submitted_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            {/* payments Tab */}
            <Tab eventKey="payments" title="Payments">
              <Table striped bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Amount (₹)</th>
                    <th>Status</th>
                    <th>Confirm</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.amount}</td>
                      <td>
                        <span
                          className={`badge ${
                            p.status === "completed" ? "bg-success" : "bg-warning"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td>
                        {p.status === "pending" && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleConfirm(p._id)}
                          >
                            Confirm
                          </Button>
                        )}
                      </td>
                      <td>{new Date(p.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Card>
      </motion.div>
    </Container>
  );
}

export default AdminPage;
