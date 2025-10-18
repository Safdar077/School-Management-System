import React from "react";
import { useNavigate } from "react-router-dom";

export default function Fees() {
  const navigate = useNavigate();

  const handlePayment = (className, amount) => {
    // You can pass params or state to the payment page
    navigate("/payment", {
      state: {
        className,
        amount,
      },
    });
  };

  return (
    <div className="container mt-5 p-3">
      <h2 className="text-center mb-4">Fee Structure</h2>

      {/* 1. Nursery to Jr. College */}
      <h4 className="mt-5 mb-3">Nursery to Jr. College</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-secondary">
          <tr>
            <th>Class</th>
            <th>Subjects</th>
            <th>Fees (INR)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Nursery", "Rhymes, Drawing, Games", 5000],
            ["Junior KG", "English, Maths, Rhymes", 6000],
            ["Senior KG", "English, Maths, Drawing", 7000],
          ].map(([cls, subjects, fee]) => (
            <tr key={cls}>
              <td>{cls}</td>
              <td>{subjects}</td>
              <td>{fee}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handlePayment(cls, fee)}
                >
                  Pay Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 2. Class 1 to 10 */}
      <h4 className="mt-5 mb-3">Class 1 to 10</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>Class</th>
            <th>Subjects</th>
            <th>Fees (INR)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Class 1", "English, Marathi, Maths, EVS", 8000],
            ["Class 2", "English, Hindi, Maths, EVS", 8500],
            ["Class 3", "English, Hindi, Maths, Science, SST", 9000],
            ["Class 4", "English, Hindi, Maths, Science, SST", 9500],
            ["Class 5", "English, Hindi, Maths, Science, SST", 10000],
            ["Class 6", "English, Hindi, Maths, Science, SST, Computers", 11000],
            ["Class 7", "English, Hindi, Maths, Science, SST, Computers", 11500],
            ["Class 8", "English, Hindi, Maths, Science, SST, Computers", 12000],
            ["Class 9", "English, Hindi, Maths, Science, SST", 13000],
            ["Class 10", "English, Hindi, Maths, Science, SST", 14000],
          ].map(([cls, subjects, fee]) => (
            <tr key={cls}>
              <td>{cls}</td>
              <td>{subjects}</td>
              <td>{fee}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handlePayment(cls, fee)}
                >
                  Pay Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 3. Class 11 & 12 */}
      <h4 className="mt-5 mb-3">Class 11 & 12 (Commerce / Science)</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-success">
          <tr>
            <th>Class</th>
            <th>Stream</th>
            <th>Subjects</th>
            <th>Fees (INR)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Class 11", "Commerce", "Accounts, Economics, OCM, SP, English", 18000],
            ["Class 11", "Science", "Physics, Chemistry, Maths, Biology, English", 22000],
            ["Class 12", "Commerce", "Accounts, Economics, OCM, SP, English", 19000],
            ["Class 12", "Science", "Physics, Chemistry, Maths, Biology, English", 24000],
          ].map(([cls, stream, subjects, fee], idx) => (
            <tr key={idx}>
              <td>{cls}</td>
              <td>{stream}</td>
              <td>{subjects}</td>
              <td>{fee}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handlePayment(`${cls} - ${stream}`, fee)}
                >
                  Pay Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
