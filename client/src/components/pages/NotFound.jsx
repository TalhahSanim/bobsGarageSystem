// File -> client/src/components/pages/NotFound.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

//  404 page -> shows for addresses don't match a route in  app.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-md py-16 text-center">
      <p className="text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-2 text-3xl uppercase">Page Not Found</h1>
      <p className="mt-2 text-muted">
        Apologies, we couldn't locate this page. It must have moved!
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        Go Back Home
      </Link>
    </section>
  );
}
