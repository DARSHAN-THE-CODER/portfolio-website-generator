import React, { useState } from 'react'

function Navbar({ activeNav, setActiveNav }) {
    const [navLinks, setNavLinks] = useState([
        {
            name: "About"
        },
        {
            name: "Resume"
        },
        {
            name: "Portfolio"
        },
        {
            name: "Blog"
        },
        {
            name: "Contact"
        }
    ])
    return (
        <nav class="navbar">

            <ul class="navbar-list">

                {/* <li class="navbar-item">
                    <button class={`navbar-link ${activeNav === "about" ? "active" : ""} `} data-nav-link>About</button>
                </li>

                <li class="navbar-item">
                    <button class={`navbar-link ${activeNav === "resume" ? "active" : ""} `} data-nav-link>Resume</button>
                </li>

                <li class="navbar-item">
                    <button class={`navbar-link ${activeNav === "portfolio" ? "active" : ""} `} data-nav-link>Portfolio</button>
                </li>

                <li class="navbar-item">
                    <button class={`navbar-link ${activeNav === "blog" ? "active" : ""} `} data-nav-link>Blog</button>
                </li>

                <li class="navbar-item">
                    <button class={`navbar-link ${activeNav === "contact" ? "active" : ""} `} data-nav-link>Contact</button>
                </li> */}
                {
                    navLinks?.map((navLink, index) => (
                        <li class="navbar-item" key={index}>
                            <button class={`navbar-link ${activeNav === navLink.name ? "active" : ""} `} data-nav-link
                                onClick={() => setActiveNav(navLink?.name)}
                            >
                                {navLink.name}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Navbar