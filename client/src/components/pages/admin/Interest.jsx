// File -> client/src/components/pages/admin/Interest.jsx
// Admin Page -> each customer who favourited a service and whether they been contacted

import { useState, useEffect } from "react";
import axios from "axios";

const favouritesURL = "http://localhost:3000/api/favourites";

// INterest component which containes table of favorites newest first

export default function Interest() {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("loading");

  //   Load every favourite which is an admin route onc when page opens
  useEffect(() => {
    // get all favourites with customer and service details
    const loadAll = async () => {
      try {
        const res = await axios.get(`${favouritesURL}/all`);
        setList(res.data);
        setStatus("succeeded");
      } catch (err) {
        console.log("loadAll failed", err.message);
        setStatus("failed");
      }
    };
    loadAll();
  }, []);

  //   Switch a favourite from new and contacted and it takes in the favourite
  const contactedToggle = async (favourite) => {
    const newStatus = favourite.status === "new" ? "contacted" : "new";
    try {
      await axios.put(`${favouritesURL}/${favourite.favouriteId}/status`, {
        status: newStatus,
      });
      //   Update just that row within the list
      setList((prev) =>
        prev.map((item) =>
          (
            item.favouriteId === favourite.favouriteId
              ? { ...item, status: newStatus }
              : item
          )
            ? { ...item, status: newStatus }
            : item,
        ),
      );
    } catch (err) {
      console.log("contactedToggle failed", err.message);
    }
  };

  if (status === "loading") {
    return (
      <p className="flex items-center  gap-3 text-muted">
        <span className="spinner" aria-hidden="true"></span> Loading....
      </p>
    );
  }

  if (status === "failed") {
    return (
      <p className="alert-danger">
        Could not load the list. Are you logged in?
      </p>
    );
  }

  //   number of people still waiting to be contacted
  const waiting = list.filter((favourite) => favourite.status === "new").length;

  return (
    <main className="my-6">
      <title>Interested Customers - Bob's Garage</title>
      <h1 className="mb-2 text-3xl font-bold">Interested Customers</h1>
      <p className="mb-6 text-muted">
        {waiting} {waiting === 1 ? "customer is" : "customers are"} waiting to
        be contacted
      </p>
      {list.length === 0 && (
        <p className="border border-dashed border-line p-8 text-center text-muted">
          No Customer has saved a service yet.
        </p>
      )}
      <div className="panel">
        <div className="panel-body overflow-x-auto">
          <table className="w-full text-left text-sm">
            {/* Table Headings */}
            <thead className="border-b-2 border-line">
              <tr>
                <th scope="col" className="p-2">
                  Date
                </th>
                <th scope="col" className="p-2">
                  Customer
                </th>
                <th scope="col" className="p-2">
                  Email
                </th>
                <th scope="col" className="p-2">
                  Service
                </th>
                <th scope="col" className="p-2">
                  Status
                </th>
                <th scope="col" className="p-2">
                  Action
                </th>
              </tr>
            </thead>
            {/* One row each favourite */}
            <tbody className="divide-y divide-line">
              {list.map((favourite) => (
                <tr
                  key={favourite.favouriteId}
                  className={
                    favourite.status === "new" ? "font-semibold" : "text-muted"
                  }
                >
                  <td className="p-2">
                    {new Date(favourite.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {`${favourite.User.firstName}
                   ${favourite.User.lastName}
                   `}
                  </td>
                  <td className="p-2">
                    <a
                      href={`mailto:${favourite.User.email}`}
                      className="underline"
                    >
                      {favourite.User.email}
                    </a>
                  </td>
                  <td className="p-2">{favourite.Service.name}</td>
                  <td className="p-2">
                    {favourite.status === "contacted" ? (
                      <span className="badge badge-responded">Contacted</span>
                    ) : (
                      <span className="badge badge-pending">New</span>
                    )}
                  </td>
                  <td className="p-2">
                    <button
                      type="button"
                      className="btn btn-primary text-xs"
                      onClick={() => contactedToggle(favourite)}
                    >
                      {favourite.status === "new"
                        ? "Tick Contacted"
                        : "Tick as new"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
