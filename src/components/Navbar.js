import '../styles/navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // State to manage active link
    const [activeLink, setActiveLink] = useState("");

    const handleClick = (path) => {
        // Set active link to the clicked path
        setActiveLink(path);
    };

    return ( 
        <div className="navbar">
            <ul id="foo">
                <Link to="/home" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <li className={activeLink === "/" ? "active" : ""} onClick={() => handleClick("/")}>
                        <svg preserveAspectRatio="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 18V15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.07 2.82L3.13999 8.37C2.35999 8.99 1.85999 10.3 2.02999 11.28L3.35999 19.24C3.59999 20.66 4.95999 21.81 6.39999 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.99 20.86 8.37L13.93 2.83C12.86 1.97 11.13 1.97 10.07 2.82Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="text">Home</div>   
                    </li>
                </Link>
                <Link to="/cart" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <li className={activeLink === "/cart" ? "active" : ""} onClick={() => handleClick("/cart")}>
                        <svg preserveAspectRatio="true" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17.5C7.82843 17.5 8.5 16.8284 8.5 16C8.5 15.1716 7.82843 14.5 7 14.5C6.17157 14.5 5.5 15.1716 5.5 16C5.5 16.8284 6.17157 17.5 7 17.5Z"/>
                            <path d="M14 17.5C14.8284 17.5 15.5 16.8284 15.5 16C15.5 15.1716 14.8284 14.5 14 14.5C13.1716 14.5 12.5 15.1716 12.5 16C12.5 16.8284 13.1716 17.5 14 17.5Z"/>
                            <path d="M0.5 1H2.5L6.004 12H14" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.22399 9.5L3.29999 3.5H15.807C15.8863 3.4999 15.9644 3.51865 16.035 3.5547C16.1056 3.59075 16.1666 3.64307 16.213 3.70734C16.2594 3.77162 16.2899 3.846 16.3019 3.92435C16.3138 4.00271 16.307 4.08279 16.282 4.158L14.615 9.158C14.5818 9.25752 14.5182 9.3441 14.4332 9.40548C14.3481 9.46685 14.2459 9.49992 14.141 9.5H5.22399Z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="text">Cart</div>   
                    </li>
                </Link>
                <Link to="/profile" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <li className={activeLink === "/profile" ? "active" : ""} onClick={() => handleClick("/profile")}>
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.66 10.87C12.56 10.86 12.44 10.86 12.33 10.87C9.95 10.79 8.06 8.84 8.06 6.44C8.06 3.99 10.04 2 12.5 2C14.95 2 16.94 3.99 16.94 6.44C16.93 8.84 15.04 10.79 12.66 10.87Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.65997 14.56C5.23997 16.18 5.23997 18.82 7.65997 20.43C10.41 22.27 14.92 22.27 17.67 20.43C20.09 18.81 20.09 16.17 17.67 14.56C14.93 12.73 10.42 12.73 7.65997 14.56Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="text">Profile</div>
                    </li>
                </Link>
                <Link to="/history" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <li className={activeLink === "/history" ? "active" : ""} onClick={() => handleClick("/history")}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.636 18.364C7.10845 19.8365 9.04594 20.7528 11.1183 20.9568C13.1906 21.1608 15.2696 20.6399 17.0009 19.4828C18.7322 18.3257 20.0087 16.6041 20.6129 14.6113C21.217 12.6185 21.1115 10.4778 20.3142 8.55414C19.5169 6.63045 18.0772 5.04276 16.2404 4.06164C14.4037 3.08051 12.2835 2.76667 10.2413 3.17358C8.19909 3.58049 6.36116 4.68299 5.04073 6.29318C3.72031 7.90338 2.99909 9.92163 3 12.004V14" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 12L3 14L5 12M11 8V13H16" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="text">History</div>
                    </li>
                </Link>
            </ul>
        </div>
     );
}
 
export default Navbar;
