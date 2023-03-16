import { useState } from "react"
import Link from "next/link"

import { toast } from "react-toastify";

function Login() {
    const [user, setUser] = useState({})
    const [error, setError] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        console.log("inside fn", user)
    }

    function isEmpty(){
        return !user.username || !user.password
    }
    return (
        <article className="active md:w-[70vw] flex justify-center mt-[100px] m-auto">
            <header>
                <h2 className="h2 article-title">Login</h2>
            </header>
            <section className="m-auto flex justify-center">
                <form className="form w-[300px]" onSubmit={handleSubmit} target="_blank">
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
                    <div className="form-group mt-4" >
                        <button className="form-btn m-auto" type="submit" disabled={isEmpty()}>
                            Login
                        </button>
                    </div>
                </form>
            </section>

        </article>
    )
}

export default Login