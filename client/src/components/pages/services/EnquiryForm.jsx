// File -> client/src/components/pages/services/EnquiryForm.jsx
// The enquire is about this service form on details page
// takes in service its about

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useEnquiries } from "../../../context/EnquiriesContext";

const max = 1000;

// Enquiry form component -> message box and send button
export default function EnquiryForm({ service }) {
  const { user } = useAuth();
  const { sendEnquiry } = useEnquiries();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");
  // idle or sending to prevent button be clicked twice
  const [status, setStatus] = useState("idle");

  // Runs when the form is submitted -> check message and send it
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSent("");

    // same rule as server-> at least 10 characters
    if (message.trim().length < 10) {
      setError("Please type at least 10 characters");
      return;
    }

    setStatus("sending");
    const result = await sendEnquiry(service.serviceId, message.trim());
    setStatus("idle");

    if (result.ok) {
      setMessage("");
      setError("");
      setSent(result.msg);
    } else {
      setError(result.msg);
    }
  };
  return (
    <section className="panel mt-8">
      <div className="panel-header">Enquire About {service.name}</div>
      <div className="panel-body">
        <form onSubmit={handleSubmit}>
          <p className="mb-3 text-sm text-muted">
            Sending as <span className="font-semibold">{user.firstName}</span>.
            We'll reply in your
            <Link to="/inbox" className="underline">
              Inbox
            </Link>
            .
          </p>

          <label className="form-label" htmlFor="message">
            Your Enquiry
          </label>
          <textarea
            id="message"
            rows="4"
            maxLength={max}
            className={`form-input ${error ? "is-invalid" : ""}`}
            placeholder="Example: is this service available and Id like to know more details on this service?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {/* Character count used to let user know limit before submission */}
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-danger">{error}</span>
            <span className="text-muted">
              {message.length} /{max}
            </span>
          </div>

          <button
            type="submit"
            className="btn-info mt-4 w-full"
            disabled={status === "sending"}
          >
            <FaPaperPlane />
            {status === "sending" ? "Sending..." : "Submit Enquiry"}
          </button>
        </form>

        {/* Server Thank You Response */}
        {sent && (
          <p className="alert-success mt-4" role="status">
            {sent}
          </p>
        )}
      </div>
    </section>
  );
}
