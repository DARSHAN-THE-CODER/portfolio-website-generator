import { useState } from "react"
import Link from "next/link"

import { toast } from "react-toastify";
import axios from "axios";

import { useRouter } from "next/router";
import { APIURL } from "@/utils/api.utils";
import bcrypt from 'bcryptjs';
import { getAnalytics, logEvent } from "firebase/analytics";

import { app } from "@/utils/firebase";

function Login() {
    const [user, setUser] = useState({})
    const [error, setError] = useState("")

    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault()
        console.log("inside fn", user)

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

                    localStorage.setItem('logintoken', hashedPassword)
                    logEvent(getAnalytics(app), "user logged in");
                    router.push(`/dashboard/${res.data.username}`)
                } else {
                    toast.error("Login failed")
                }
            })
            .catch((err) => {
                toast.error(err.response.data.error)
                console.log(err.response.data.error)
            }
            )
    }

    function isEmpty() {
        return !user.username || !user.password
    }

    function handlePush(e){
        e.preventDefault()
        router.push("https://mytechfolio.live/")
    }

    return (
        <article className="active md:w-[70vw] flex justify-center mt-[100px] m-auto">

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

        </article>
    )
}

export default Login