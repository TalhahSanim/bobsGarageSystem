//  404 page -> shows for addreses doont match a route in  app.jsx
import { Link } from "react-router-dom";

import React from "react";

export default function NotFound() {
  return (
    <section className="mx-auto max-w md py-16 text-center">
      <p className="text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-2 text-3xl uppercase">Page Not Found</h1>
      <p className="mt-2 text-muted">
        Apologies, we could'nt locate this page. It must have moved !
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        Go Back Home
      </Link>
    </section>
  );
}
