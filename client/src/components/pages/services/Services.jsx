// File -> client/src/components/pages/services/Services.jsx
// Author -> Talhah Sanim
// ApplicationVersion -> 1.0

// Services -> title, then loading the cards, an error , empty message or card per service
import { Link } from "react-router-dom";
import SingleService from "./SingleService";
import {
  useServices,
  useServiceStatus,
  useServicesSort,
  useServicesSearch,
} from "../../../context/GarageContext";
import { useAuth } from "../../../context/AuthContext";
import { IoSearchSharp } from "react-icons/io5";

const grid = "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"; // grid used for card and loading card placeholder to ensure they lineup

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "fee-ASC", label: "Fee: Low to High" },
  { value: "fee-DESC", label: "Fee: High to Low" },
  { value: "name-ASC", label: "Name: A-Z" },
];
export default function Services() {
  const serviceList = useServices();
  const { status, error } = useServiceStatus();
  const { sort, setSort } = useServicesSort();
  const { search, setSearch } = useServicesSearch(); // current search text and function to change
  const { isAdmin } = useAuth();

  let content;
  if (status === "loading") {
    // have gray loading cards as placeholder whilst cards load up
    content = (
      <div className={grid}>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="card animate-pulse">
            <div className="h-44 bg-line"></div>
            <div className="space-y-3 p-4">
              <div className="h-5 w-2/3 bg-line"></div>
              <div className="h-4 w-1/3 bg-line"></div>
              <div className="h-10 bg-line"></div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (status === "failed") {
    content = (
      <div className="alert-danger">
        <p>Sorry we're unable to load your service right now 😔</p>
        <p>{error}</p>
      </div>
    );
  } else if (serviceList.length === 0) {
    content = (
      <p className="border border-dashed border-line p-8 text-center text-muted">
        {search.trim()
          ? `No Services Match "${search.trim()}`
          : "Sorry, No Services At The Moment❤️‍🩹"}
      </p>
    );
  } else {
    content = (
      <div className={grid}>
        {serviceList.map((service) => (
          <SingleService key={service.serviceId} service={service} />
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl">Bob's Services</h1>
          <p className="mt-2 text-muted">
            Prices Fixed, Top Grade Mechanics and No Gotchas
          </p>
          {/* Search Box -> the label hidden but screen readers cans till read it */}
          <label className="sr-only" htmlFor="searchService">
            Search Services
          </label>
          <input
            type="search"
            id="searchService"
            placeholder="Search Services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input mt-4 w-full sm:w-72"
          />
        </div>
        <IoSearchSharp />
        <div className="flex items-center gap-3">
          {/* Sort buttons -> the selected one is filled and aria press tells screen reader which one */}

          <div
            role="group"
            aria-label="Sort services"
            className="flex flex-wrap gap-2"
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={sort === option.value}
                onClick={() => setSort(option.value)}
                className={`btn btn-sm ${sort === option.value ? "btn-primary" : "btn-outline"}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {isAdmin && (
            <Link to="/add-service" className="btn btn-primary">
              + Add Service
            </Link>
          )}
        </div>
      </div>
      {content}
    </section>
  );
}
