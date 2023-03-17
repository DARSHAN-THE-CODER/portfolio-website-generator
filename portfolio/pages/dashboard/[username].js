import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import AboutForm from "@/components/dashboard/aboutForm"
import ResumeForm from "@/components/dashboard/resumeForm"
import ProjectsForm from "@/components/dashboard/projectsForm"
import ContactFormResponses from "@/components/dashboard/contactFormResponses"

import axios from "axios"
import { toast } from 'react-toastify'
import { APIURL } from "@/utils/api.utils"

import { useRouter } from "next/router"
import bcrypt from 'bcryptjs';

function Dashboard() {
    const [activeNav, setActiveNav] = useState("AboutForm")
    const [username, setUsername] = useState("")

    const [navLinks, setNavLinks] = useState(
        [{
            name: "AboutForm"
        },
        {
            name: "ResumeForm"
        },
        {
            name: "PortfolioForm"
        },
        {
            name: "Blog"
        },
        {
            name: "ContactFormResponses"
        }]
    )

    const router = useRouter();

    useEffect(() => {
        // let location = window.location.hostname;
        // let check = location.split(".");
        // console.log(check)
        // if (check[0] !== "localhost") {
        // axios.get(`${APIURL}/user/username/${check[0]}`)
        //     .then((res) => {
        //         // console.log(res)
        //         if (res.status === 200) {
        //             setUsername(check[0])
        //         }
        //         else {
        //             return toast.error(`No user found with username ${check[0]}`)
        //             // router.push('https://www.mytechfolio.tech');
        //             // router.push('http://www.mytechfolio.tech');
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        // }

        if (router?.query['username']) {

            let hashedPassword = localStorage.getItem("logintoken")
            console.log(hashedPassword)
            if(!hashedPassword){
                toast.error("Some error occured , Please login again to continue")
                router.push('/auth/login')
            } else{
                const isMatch = bcrypt.compareSync(router?.query['username'], hashedPassword);
                if (!isMatch) {
                    toast.error("Some error occured , Please login again to continue")
                    localStorage.removeItem("logintoken")
                    router.push('/auth/login')
                } else { 
                axios.get(`${APIURL}/user/username/${router?.query['username']}`)
                    .then((res) => {
                        // console.log(res)
                        if (res.status === 200) {
                            setUsername(router?.query['username'])
                        }
                        else {
                            return toast.error(`No user found with username ${router?.query['username']}`)
                            // router.push('https://www.mytechfolio.tech');
                            // router.push('http://www.mytechfolio.tech');
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            }
        }
    }, [router])

    return (
        <div className="">
            <div className="dashboard-content">
                <Navbar activeNav={activeNav} setActiveNav={setActiveNav} navLinks={navLinks} setNavLinks={setNavLinks} showLogout={true} />
                <AboutForm activeNav={activeNav} username={username} />
                <ResumeForm activeNav={activeNav} username={username} />
                <ProjectsForm activeNav={activeNav} username={username} />
                <ContactFormResponses activeNav={activeNav} username={username} />
            </div>
        </div>
    )
}

export default Dashboard