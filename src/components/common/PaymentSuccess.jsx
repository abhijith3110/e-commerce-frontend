import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import axios from "axios";
import { backendUrl } from "../../utils/BackendURL";
import "./modal.css";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Processing payment...");
  const [loading, setLoading] = useState(true);
  const [celebrate, setCelebrate] = useState(false);
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/order/verify-payment`,
          { session_id: sessionId }
        );

        if (response.data.status) {
          setMessage("Payment successful! Your order has been placed.");
          setCelebrate(true);
        } else {
          setMessage("Payment verification failed. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred while verifying payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="payment-modal">
      <div className="payment-modal-container">
        {loading ? <p className="loading">Loading...</p> : <h1>{message}</h1>}
        <button className="close-btn" onClick={() => navigate("/")}>
          Happy Shopping
        </button>
      </div>
      {celebrate && <Confetti />}
    </div>
  );
};

export default PaymentSuccess;
