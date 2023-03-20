import React, { useState } from 'react'
import Image from 'next/image'
// import m from "../assets/avatar-1.png"

function Sidebar({user}) {

    // console.log(m)
    const [sidebarActive, setSidebarActive] = useState(false)

    return (
        <aside className={`sidebar ${sidebarActive ? "active" : ""}`} data-sidebar>

            <div className="sidebar-info">

                <figure className="avatar-box">
                    <img src={(user?.gender === "male" &&  "https://i.ibb.co/wgkWbX6/STK-20201216-WA0002.webp") ||  ( user?.gender === "female" && "https://i.ibb.co/3mLf5T6/2290702-512.webp")} alt={"Update gender to see memoji"} className="w-[90px] h-[90px] md:h-full"/>
                </figure>

                <div className="info-content">
                    <h1 className="name" title="Richard hanrick">{user?.name}</h1>

                    <p className="title">{user?.shortDesc}</p>
                </div>

                <button className="info_more-btn active" data-sidebar-btn onClick={() => setSidebarActive(!sidebarActive)}>
                    <span>Show Contacts</span>

                    <ion-icon name="chevron-down"></ion-icon>
                </button>

            </div>

            <div className="sidebar-info_more active">

                <div className="separator"></div>

                <ul className="contacts-list">

                    <li className="contact-item">

                        <div className="icon-box">
                            <ion-icon name="mail-outline"></ion-icon>
                        </div>

                        <div className="contact-info">
                            <p className="contact-title">Email</p>

                            <a href="mailto:richard@example.com" className="contact-link">{user?.email}</a>
                        </div>

                    </li>

                    <li className="contact-item">

                        <div className="icon-box">
                            <ion-icon name="phone-portrait-outline"></ion-icon>
                        </div>

                        <div className="contact-info">
                            <p className="contact-title">Phone</p>

                            <a href="tel:+12133522795" className="contact-link">{user?.phone}</a>
                        </div>

                    </li>

                    <li className="contact-item">

                        <div className="icon-box">
                            <ion-icon name="calendar-outline"></ion-icon>
                        </div>

                        <div className="contact-info">
                            <p className="contact-title">Birthday</p>

                            <time dateTime="1982-06-23">{user?.dob}</time>
                        </div>

                    </li>

                    <li className="contact-item">

                        <div className="icon-box">
                            <ion-icon name="location-outline"></ion-icon>
                        </div>

                        <div className="contact-info">
                            <p className="contact-title">Location</p>

                            <address>{user?.address}</address>
                        </div>

                    </li>

                </ul>

                {/* <div className="separator"></div>

                <ul className="social-list">

                    <li className="social-item">
                        <a href="#" className="social-link">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                    </li>

                    <li className="social-item">
                        <a href="#" className="social-link">
                            <ion-icon name="logo-twitter"></ion-icon>
                        </a>
                    </li>

                    <li className="social-item">
                        <a href="#" className="social-link">
                            <ion-icon name="logo-Instagram"></ion-icon>
                        </a>
                    </li>

                </ul> */}
            </div>
        </aside>
    )
}

export default Sidebar