import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from "next/router"

function Navbar({ activeNav, setActiveNav, navLinks, setNavLinks, showLogout=false }) {

    const router = useRouter();

    function handleLogout(){
        localStorage.removeItem("logintoken")
        toast.success("Logged out successfully")
        router.push(`/`)
    }
    return (
        <nav className="navbar">
            <ul className="navbar-list">
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