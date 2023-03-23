import { useState } from "react"
import Link from "next/link"

import { toast } from "react-toastify";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { APIURL } from "@/utils/api.utils";
import bcrypt from 'bcryptjs';
import { getAnalytics, logEvent } from "firebase/analytics";
import Loader from '@/components/common/loader'
import { app } from "@/utils/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Login() {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const auth = getAuth();

    function handleSubmit(e) {
        e.preventDefault()
        console.log("inside fn", user)
        setLoading(true)
        // signInWithEmailAndPassword(auth, "reachdarshanv@gmail.com", user.password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         console.log("jkdsnc",userCredential)
        //         const user = userCredential.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         console.log("error is ",error.message)
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //     });

        axios.post(`${APIURL}/user/login`, { data: user })
            .then((res) => {
                console.log(res.data)
                if (res.status === 200) {
                    toast.success("Login successful")
                    let allow = {
                        name: res.data.username,
                        id: res.data.id,
                    }
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(res.data.username, salt);
                    // const isMatch = bcrypt.compareSync(res.data.username, hashedPassword);
                    setLoading(false)
                    localStorage.setItem('logintoken', hashedPassword)
                    logEvent(getAnalytics(app), "user logged in");
                    router.push(`/dashboard/${res.data.username}`)
                } else {
                    toast.error("Login failed")
                }
            })
            .catch((err) => {
                toast.error(err.response.data.error)
                setLoading(false)
                console.log(err.response.data.error)
            }
            )
    }

    function isEmpty() {
        return !user.username || !user.password
    }

    function handlePush(e) {
        e.preventDefault()
        router.push("/")
    }

    return (
        <article className="active md:w-[70vw] flex justify-center mt-[100px] m-auto">

            <Head>
                <title>Awesome Portfolio | Build free portfolio website</title>
                <meta name="description" content="Build free portfolio website" />
                <meta name="author" content="Darshan V" />
                <meta property="og:url" content="https://mytechfolio.live/" />
                <meta property="og:description" content="Everything you need to build free portfolio under 5 mins" />
            </Head>
            {
                loading ?
                    <Loader title={"Logging you in "} description={"  "} />
                    :
                    (

                        <>
                            <header>
                                <h2 className="h2 article-title">Login</h2>
                            </header>
                            <section className="m-auto flex justify-center">
                                <form className="form w-[300px]" target="_blank">
                                    <div className="form-group text-white">
                                        <input required className="border-2 rounded-2xl p-2 m-2" type="text" name="username" id="" placeholder="Enter your username"
                                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group text-white">
                                        <input required type="password" className="border-2 rounded-2xl p-2 m-2" name="password" id="password" placeholder="Enter your password"
                                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        />
                                    </div>
                                    <p className="text-gray-400 italic flex">Don't have an account ? <span className="text-white ml-2 hover:underline"><Link href={"/auth/register"}>Register</Link></span> </p>
                                    <div className="form-group mt-4 flex" >
                                        <button className={`form-btn m-auto`} data-nav-link
                                            onClick={(e) => handlePush(e)}
                                        >
                                            Back
                                        </button>
                                        <button className="form-btn m-auto" disabled={isEmpty()} onClick={(e) => handleSubmit(e)}>
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </>
                    )
            }
        </article>
    )
}

export default Login