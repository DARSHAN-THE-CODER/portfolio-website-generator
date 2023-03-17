import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from "next/router"

function Navbar({ activeNav, setActiveNav, navLinks, setNavLinks, showLogout=false }) {
    // const [navLinks, setNavLinks] = useState([
    //     {
    //         name: "About"
    //     },
    //     {
    //         name: "Resume"
    //     },
    //     {
    //         name: "Portfolio"
    //     },
    //     {
    //         name: "Blog"
    //     },
    //     {
    //         name: "Contact"
    //     }
    // ])

    const router = useRouter();

    function handleLogout(){
        localStorage.removeItem("logintoken")
        toast.success("Logged out successfully")
        router.push(`/auth/login`)
    }
    return (
        <nav className="navbar">

            <ul className="navbar-list">

                {/* <li className="navbar-item">
                    <button className={`navbar-link ${activeNav === "about" ? "active" : ""} `} data-nav-link>About</button>
                </li>

                <li className="navbar-item">
                    <button className={`navbar-link ${activeNav === "resume" ? "active" : ""} `} data-nav-link>Resume</button>
                </li>

                <li className="navbar-item">
                    <button className={`navbar-link ${activeNav === "portfolio" ? "active" : ""} `} data-nav-link>Portfolio</button>
                </li>

                <li className="navbar-item">
                    <button className={`navbar-link ${activeNav === "blog" ? "active" : ""} `} data-nav-link>Blog</button>
                </li>

                <li className="navbar-item">
                    <button className={`navbar-link ${activeNav === "contact" ? "active" : ""} `} data-nav-link>Contact</button>
                </li> */}
                {
                    navLinks?.map((navLink, index) => (
                        <li className="navbar-item" key={index}>
                            <button className={`navbar-link ${activeNav === navLink.name ? "active" : ""} `} data-nav-link
                                onClick={() => setActiveNav(navLink?.name)}
                            >
                                {navLink.name}
                            </button>
                        </li>
                    ))
                }
                {
                    showLogout && (
                <li className="navbar-item" >
                    <button className={`form-btn m-auto`} data-nav-link
                    onClick={() => handleLogout()}
                    >
                       Logout
                    </button>
                </li>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar