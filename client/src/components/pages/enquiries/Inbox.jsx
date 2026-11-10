// File -> client/src/components/pages/enquiries/Inbox.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// The logged in user's enquiries and businesses replies/responses
// opening a replied enquiry makes it read

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaReply, FaEnvelopeOpen } from "react-icons/fa";
import { useEnquiries } from "../../../context/EnquiriesContext";

import { imgSrc } from "../../../utils/imgSrc";

// Inbox component which has expandable item each enquiry
export default function Inbox() {
  const { enquiries, unreadCount, tickRead, loadEnquiries } = useEnquiries();

  //   Check for each new reply every time  the inbox opens

  useEffect(() => {
    loadEnquiries();
  }, []);

  // when item opens and has unread reply tick it as read and it takes in the enquiry and toggle event
  const handleToggle = (enquiry, e) => {
    if (
      e.currentTarget.open &&
      enquiry.status === "responded" &&
      !enquiry.readByUser
    ) {
      tickRead(enquiry.enquiryId);
    }
  };
  return (
    <main className="my-6">
      <title>Inbox - Bob's Garage</title>
      <h1 className="mb-1 text-3xl font-bold">Inbox</h1>
      <p className="mb-6 text-muted">
        {unreadCount > 0
          ? `${unreadCount} new ${unreadCount === 1 ? "reply" : "replies"}`
          : "You're All Caught Up"}
      </p>

      {/* Empty state or empty list */}
      {enquiries.length === 0 ? (
        <p className="border border-dashed border-line p-8 text-center text-muted">
          No Enquiries. Open Any
          <Link to="/services" className="underline">
            Service
          </Link>
          and ask us any queries you have?
        </p>
      ) : (
        <ul className="grid gap-3">
          {enquiries.map((enquiry) => {
            const unread =
              enquiry.status === "responded" && !enquiry.readByUser;
            return (
              <li key={enquiry.enquiryId}>
                <details
                  className={`border bg-surface p-4 shadow-sm ${unread ? "border-primary" : "border-line"}`}
                  onToggle={(e) => handleToggle(enquiry, e)}
                >
                  {/* always on row -> Service, date and status */}
                  <summary className="flex cursor-pointer list-none items-center gap-4">
                    <img
                      src={imgSrc(enquiry.Service.image)}
                      alt=""
                      className="size-14 object-cover "
                    />
                    <div className="flex-1">
                      <p className={unread ? "font-bold" : "font-semibold"}>
                        {unread && (
                          <span className="me-2 inline-block size-2 bg-primary"></span>
                        )}
                        {enquiry.status === "responded"
                          ? "Reply"
                          : "Your Enquiry"}{" "}
                        about {enquiry.Service.name}
                      </p>
                      <p className="text-sm text-muted">
                        Sent {new Date(enquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {enquiry.status === "responded" ? (
                      <span className="badge badge-responded">Responded</span>
                    ) : (
                      <span className="badge badge-pending">Pending</span>
                    )}
                  </summary>

                  {/* Opened -> the enquiry and reply */}
                  <div className="mt-4 grid-gap-3 border-t border-line pt-4">
                    <div>
                      <p className="text-sm font-semibold text-muted">
                        You enquired
                      </p>
                      <p className="whitespace-pre-line">{enquiry.message}</p>
                    </div>
                    {enquiry.reply ? (
                      <div className="alert-success p-3">
                        <p className="flex items-center gap-2 text-sm font-semibold">
                          <FaReply /> Bob's Garage replied on{" "}
                          {new Date(enquiry.repliedAt).toLocaleDateString()}
                        </p>
                        <p className="mt-1 whitespace-pre-line">
                          {enquiry.reply}
                        </p>
                      </div>
                    ) : (
                      <p className="flex items-center gap-2 text-sm text-muted">
                        <FaEnvelopeOpen /> We have not replied Yet. We'll let
                        you know here.
                      </p>
                    )}
                    <Link
                      to={`/services/${enquiry.serviceId}`}
                      className="text-sm underline"
                    >
                      View {enquiry.Service.name}
                    </Link>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
