// components/Navbar.js
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link className="navbar-brand" href="/">
                    <Image src="/logo.png" width={110} height={45} alt="cover page generate" />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" aria-current="page" href="/invoice/generate">Generate Invoice</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" aria-current="page" href="/invoice/cover">Generate cover page</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
