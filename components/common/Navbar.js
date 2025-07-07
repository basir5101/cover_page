// components/Navbar.js
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" href="/">
          <Image
            src="/logo.png"
            width={110}
            height={45}
            alt="cover page generate"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link navbar-item"
                aria-current="page"
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link navbar-item"
                aria-current="page"
                href="/cover-page"
              >
                Cover Pages
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfuinHLBsD4g1bYWjJNi73LMk5hoy_JQNHfyuUWU7c5GYmgFw/viewform?usp=header"
                target="_blank"
                className="nav-link navbar-item"
                style={{ fontSize: "1.1rem" }}
              >
                🚀 Request Cover Page
              </a>
            </li>
            {/* <li className="nav-item">
                            <Link className="nav-link navbar-item" aria-current="page" href='/cover-page/bsmrstu/lab-report'>Lab Report</Link>
                        </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
