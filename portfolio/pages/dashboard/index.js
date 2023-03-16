import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import AboutForm from "@/components/dashboard/aboutForm"
import ResumeForm from "@/components/dashboard/resumeForm"
import axios from "axios"
import { toast } from 'react-toastify'
import { APIURL } from "@/utils/api.utils"

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
            name: "ContactForm"
        }]
    )

    useEffect(() => {
        let location = window.location.hostname;
        let check = location.split(".");
        console.log(check)
        if (check[0] !== "localhost") {
            axios.get(`${APIURL}/user/username/${check[0]}`)
                .then((res) => {
                    // console.log(res)
                    if (res.status === 200) {
                        setUsername(check[0])
                    }
                    else {
                        return toast.error(`No user found with username ${check[0]}`)
                        // router.push('https://www.mytechfolio.tech');
                        // router.push('http://www.mytechfolio.tech');
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <div className="">
            <div className="dashboard-content">
                <Navbar activeNav={activeNav} setActiveNav={setActiveNav} navLinks={navLinks} setNavLinks={setNavLinks} />
                <AboutForm activeNav={activeNav} />
                <ResumeForm activeNav={activeNav} />
            </div>
        </div>
    )
}

export default Dashboard