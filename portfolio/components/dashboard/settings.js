import { APIURL } from '@/utils/api.utils'
import axios from 'axios'
import { basePath } from 'next.config'
import React from 'react'
import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';

import Head from "next/head";

import Loader from '../common/loader'

function Settings({ activeNav, username }) {
    const router = useRouter();

    const [details, setDetails] = useState({})
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {

    }, [])

    function handleSubmit(e) {

    }


    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage(
            "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one special character, and one number."
          );
        } else {
            setErrorMessage("");
        }
      };

    function isEmpty() {
        return (details?.password?.toString().trim() === "")
    }

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setDetails({ ...details, password: newPassword })
        validatePassword(newPassword);
      };

    return (
        <article className={`resume ${activeNav === "Settings" ? "active" : ""}`} data-page="resume">
            <Head>
                <title>Awesome Portfolio | Build free portfolio website</title>
                <meta name="description" content="Build free portfolio website" />
                <meta name="author" content="Darshan V" />
            </Head>

            <header>
                <h2 className="h2 article-title">Account Settings</h2>
            </header>
            <section className="m-auto ">
                <form className="form w-[300px]" target="_blank">
                    <div className="form-group text-white">
                        <label htmlFor={``} className="mb-1 flex xd">
                            <p className="mr-2 text-xl xd">Change password</p>
                        </label>
                        <input required className="border-2 rounded-2xl p-2 m-2" type="password" name="password" id="" placeholder="Enter new password"
                            onChange={(e) => handlePasswordChange(e)}
                            value={details?.password}
                        />
                        <div style={{ color: 'red' }}>{errorMessage}</div>
                    </div>
                    {/* <div className="form-group text-white">
                        <input required type="password" className="border-2 rounded-2xl p-2 m-2" name="password" id="password" placeholder="Enter your password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div> */}
                    {/* <p className="text-gray-400 italic flex">Don't have an account ? <span className="text-white ml-2 hover:underline"><Link href={"/auth/register"}>Register</Link></span> </p> */}
                    <div className="form-group mt-4 flex" >
                        {/* <button className={`form-btn m-auto`} data-nav-link
                            onClick={(e) => handlePush(e)}
                        >
                            Back
                        </button> */}
                        <button className="form-btn m-auto" disabled={isEmpty()} onClick={(e) => handleSubmit(e)}>
                            Change Password
                        </button>
                    </div>
                </form>
            </section>
        </article>
    )
}

export default Settings