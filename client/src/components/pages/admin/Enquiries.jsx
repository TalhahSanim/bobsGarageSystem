// File -> client/src/components/pages/admin/Enquiries.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Admin page for customer enquiries which is filtered by status and reply

import { useEffect, useState } from "react";
import axios from "axios";
import { FaReply } from "react-icons/fa";

const enquiriesURL = "http://localhost:3000/api/enquiries";

// The filter buttons -> label and the ?status = value "" =all
const filters = [
  { label: "Pending", value: "pending" },
  { label: "Responded", value: "responded" },
  { label: "All", value: "" },
];

// Enquiries component which is a list of enquires with reply boxes on each pending one
export default function Enquiries() {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("loading");
  // Which option was selected and start what needs to done such as pending
  const [filter, setFilter] = useState("pending");
  // The reply being typed for each enquiry -> {[enquiryId]: "text"}
  const [drafts, setDrafts] = useState({});
  const [error, setError] = useState("");

  // Load enquiries when ever filter get changed
  useEffect(() => {
    // Get enquiries for select choice (admin route)
    const loadList = async () => {
      setStatus("loading");
      try {
        const res = await axios.get(enquiriesURL, {
          params: filter ? { status: filter } : {},
        });
        setList(res.data);
        setStatus("succeeded");
      } catch (err) {
        console.log("loadList failed", err.message);
        setStatus("failed");
      }
    };
    loadList();
  }, [filter]);

  //   keep typed reply for one enquiry and it takes in the enquiryId
  // and the text
  const setDraft = (enquiryId, text) =>
    setDrafts((prev) => ({
      ...prev,
      [enquiryId]: text,
    }));

  // Send the reply for one enquiry and takes in the enquiryId
  const sendReply = async (enquiryId) => {
    const reply = (drafts[enquiryId] || "").trim();
    if (!reply) {
      setError("Reply Is Required");
      return;
    }
    try {
      const res = await axios.put(`${enquiriesURL}/${enquiryId}/reply`, {
        reply,
      });
      setError("");
      // On pending option the items the list ont the other it updates in place
      setList((prev) =>
        filter === "pending"
          ? prev.filter((enquiry) => enquiry.enquiryId !== enquiryId)
          : prev.map((enquiry) =>
              enquiry.enquiryId === enquiryId ? res.data : enquiry,
            ),
      );
      setDraft(enquiryId, "");
    } catch (err) {
      setError(err.response?.data?.msg || "Could Not Send The Reply");
    }
  };

  return (
    <section className="my-6">
      <title>Enquiries - Bob's Garage</title>
      <h1 className="mb-4 text-3xl font-bold">Customer Enquiries</h1>

      {/* Filter Buttons -> the selected one is filled and aria-pressed tells screen reader which one was pressed */}
      <div
        className="mb-4 flex gap-2"
        aria-label="Enquiry Filters"
        role="group"
      >
        {filters.map((option) => (
          <button
            key={option.label}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
            className={`btn btn-sm ${filter === option.value ? "btn-primary" : "btn-outline"}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && <p className="alert-danger mb-4">{error}</p>}

      {status === "loading" && (
        <p className="flex items-center gap-3 text-muted">
          <span className="spinner" aria-hidden="true"></span>
          Loading Enquiries....
        </p>
      )}
      {status === "failed" && (
        <p className="alert-danger">Could Not load the enquiries.</p>
      )}
      {status === "succeeded" && list.length === 0 && (
        <p className="border border-dashed border-line p-8 text-center text-muted">
          Nothing Here🪫
        </p>
      )}

      {status === "succeeded" && list.length > 0 && (
        <ul className="grid gap-4">
          {list.map((enquiry) => (
            <li key={enquiry.enquiryId} className="panel">
              <div className="panel-body grid gap-3">
                {/* Details of what, who and the date */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p>
                    <span className="font-semibold">
                      {enquiry.User.firstName} {enquiry.User.lastName}
                    </span>
                    <a
                      href={`mailto:${enquiry.User.email}`}
                      className="text-sm underline"
                    >
                      {enquiry.User.email}
                    </a>
                    About{" "}
                    <span className="font-semibold">
                      {enquiry.Service.name}
                    </span>
                  </p>
                  <span className="text-sm text-muted">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="whitespace-pre-line bg-page p-3">
                  {enquiry.message}
                </p>

                {/* Replied -> Show it and pending is a reply box */}
                {enquiry.status === "responded" ? (
                  <div className="alert-success p-3">
                    <p className="text-sm font-semibold">
                      Replied {new Date(enquiry.repliedAt).toLocaleDateString()}
                      {enquiry.readByUser ? ". read" : ". not read yet"}
                    </p>
                    <p className="mt-1 whitespace-pre-line">{enquiry.reply}</p>
                  </div>
                ) : (
                  <div>
                    <label
                      className="form-label "
                      htmlFor={`reply-${enquiry.enquiryId}`}
                    >
                      Reply
                    </label>
                    <textarea
                      id={`reply-${enquiry.enquiryId}`}
                      rows="3"
                      maxLength={1000}
                      className="form-input"
                      value={drafts[enquiry.enquiryId] || ""}
                      onChange={(e) =>
                        setDraft(enquiry.enquiryId, e.target.value)
                      }
                    ></textarea>
                    <button
                      type="button"
                      className="btn btn-info mt-2"
                      onClick={() => sendReply(enquiry.enquiryId)}
                    >
                      <FaReply /> Send Reply
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
