import { useState } from "react"

import Link from "next/link"
import axios from "axios"
import { APIURL } from "@/utils/api.utils"
import { toast } from "react-toastify"

function Register() {
    const [user, setUser] = useState({})
    const [error, setError] = useState()
    const [message, setMessage] = useState()

    const [isValid, setIsValid] = useState(false);
    const [isLowerCase, setIsLowerCase] = useState(true);
    const [hasNoNumbers, setHasNoNumbers] = useState(true);
    const [hasNoSpaces, setHasNoSpaces] = useState(true);
    const [hasNoSpecialChars, setHasNoSpecialChars] = useState(true);

    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        setUser((prev) => ({ ...prev, username: newUsername }));

        setIsValid(
            newUsername.match(/^[a-z]{3,}$/) !== null &&
            isLowerCase &&
            hasNoNumbers &&
            hasNoSpaces &&
            hasNoSpecialChars
        );
        setIsLowerCase(newUsername === newUsername.toLowerCase());
        setHasNoNumbers(newUsername.match(/[0-9]/) === null);
        setHasNoSpaces(newUsername.match(/\s/) === null);
        setHasNoSpecialChars(newUsername.match(/^[a-zA-Z0-9]*$/) !== null);
    };

    console.log(isValid)
    function handleSubmit(e) {
        e.preventDefault()
        console.log("inside fn", user)
        if(!isValid){
            toast.error("Username must be at least 3 lowercase letters and contain no numbers, spaces, or special characters.")
            return
        }else{
        axios.get(`${APIURL}/user/username/${user.username}`)
            .then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    toast.error("Username already exists")
                } else {
                    axios.post(`${APIURL}/user`, user)
                        .then((res) => {
                            console.log(res)
                            toast.success("User created successfully")
                        })
                        .catch((err) => {
                            toast.error(err.response.data.error)
                            console.log(err.response.data.error)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    function isEmpty() {
        return !user.name || !user.email || !user.username || !user.password
    }

    return (
        <article className="active md:w-[70vw] flex justify-center mt-[100px] m-auto">
            <header>
                <h2 className="h2 article-title">Register</h2>
            </header>
            <section className="m-auto flex justify-center">
                <form className="form w-[300px]" onSubmit={handleSubmit} target="_blank">
                    <div className="form-group text-white">
                        <input required className="border-2 rounded-2xl p-2 m-2" type="text" name="name" id="" placeholder="Enter your Full name"
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group text-white">
                        <input required className="border-2 rounded-2xl p-2 m-2" type="email" name="email" id="" placeholder="Enter your email"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group text-white">
                        <input required className="border-2 rounded-2xl p-2 m-2" type="text" name="username" id="" placeholder="Enter your username"
                            onChange={handleUsernameChange}
                        />
                    </div>
                    {!isLowerCase && (
                        <p className="text-red-500">Username must contain only lowercase letters.</p>
                    )}
                    {!hasNoNumbers && (
                        <p className="text-red-500">Username must not contain any numbers.</p>
                    )}
                    {!hasNoSpaces && (
                        <p className="text-red-500">Username must not contain any spaces.</p>
                    )}
                    {!hasNoSpecialChars && (
                        <p className="text-red-500">Username must not contain any special characters.</p>
                    )}
                    {isValid && (
                        <p className="text-green-500">Valid username!</p>
                    )}
                    <div className="form-group text-white">
                        <input required type="password" className="border-2 rounded-2xl p-2 m-2" name="password" id="password" placeholder="Enter your password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <p className="text-gray-400 italic flex">Already have an account ? <span className="text-white ml-2 hover:underline"><Link href={"/auth/login"}>Login</Link></span> </p>
                    <div className="form-group mt-4" >
                        <button className="form-btn m-auto" type="submit" disabled={isEmpty()}>
                            Register
                        </button>
                    </div>
                </form>
            </section>

        </article>
    )
}

export default Register