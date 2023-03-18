import Image from 'next/image'

import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import About from '@/components/about'
import Resume from '@/components/resume'
import Portfolio from '@/components/portfolio'
import ContactForm from '@/components/contactForm'
import { useState, useEffect } from 'react'

import axios from 'axios'
import { APIURL } from '@/utils/api.utils'

import Loader from '@/components/common/loader'

export default function MainPage({username}) {

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
    // {
    //   name: "Blog"
    // },
    {
      name: "Contact"
    }
  ])

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(username){
        axios.get(`${APIURL}/user/${username}`)
        .then((res) => {
            console.log(res.data)
            setUser(res.data)
            setLoading(false)
        })
    }
  }, [username])


  const [activeNav, setActiveNav] = useState("About")
  return (
    <>
      {loading ? <Loader title={"Fetching details"} description={"Hang on just a moment , we are fetching details. Thank you for your patience!"} /> :
        (<main>
        <Sidebar user={user} />
        <div className="main-content">
          <Navbar activeNav={activeNav} setActiveNav={setActiveNav} navLinks={navLinks} setNavLinks={setNavLinks} />
          <About username={username} activeNav={activeNav} {...user} />
          <Resume activeNav={activeNav} username={username} {...user}/>
          <Portfolio activeNav={activeNav}  username={username} {...user}/>
          <ContactForm activeNav={activeNav} username={username} socialLinks={user?.socialLinks} />
        </div>
      </main>)}
    </>
  )
}
