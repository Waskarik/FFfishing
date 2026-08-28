import { Link } from "react-router-dom";

function SiteHeader() {
  return (
    <header className="border-bottom border-secondary">
      <div className="container py-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
        <Link
          className="siteTitle h3 mb-0 text-decoration-none text-warning"
          to="/"
        >
          BadFish
        </Link>

        <div className="d-flex gap-2">
          <Link
            className="trackerButton btn btn-sm btn-outline-light"
            to="/tracker"
          >
            My Tracker
          </Link>
          <Link
            className="aboutButton btn btn-sm btn-outline-light"
            to="/about"
          >
            About
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
