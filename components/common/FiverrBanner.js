const FiverrBootstrapBanner = () => {
  return (
    <div className="container my-5">
      <div className="card border-0 rounded-4 bg-dark text-white shadow-lg overflow-hidden position-relative">
        {/* Decorative Glow */}
        <div
          className="position-absolute bg-success opacity-10 rounded-circle"
          style={{
            width: "300px",
            height: "300px",
            top: "-150px",
            right: "-150px",
            filter: "blur(80px)",
          }}
        ></div>

        <div className="card-body p-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h6
                className="text-success fw-bold text-uppercase mb-3 tracking-wider"
                style={{ letterSpacing: "2px" }}
              >
                <span className="badge border border-success text-success bg-transparent">
                  Open for Hire
                </span>
              </h6>
              <h2 className="display-6 fw-bold mb-3">
                Need a <span className="text-success">Full-Stack</span> Next.js
                Developer?
              </h2>
              <p className="lead text-secondary mb-4 mb-lg-0">
                {`Custom web solutions, API integrations, and SEO-optimized interfaces. 
                Let's build something exceptional together.`}
              </p>
            </div>

            <div className="col-lg-4 text-lg-end">
              <a
                href="https://www.fiverr.com/s/LdABQlY"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-lg px-5 py-3 fw-bold rounded-pill shadow transition-all"
              >
                Hire Me on Fiverr
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiverrBootstrapBanner;
