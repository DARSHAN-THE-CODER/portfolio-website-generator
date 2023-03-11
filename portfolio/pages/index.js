import Image from 'next/image'

import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import About from '@/components/about'
import Resume from '@/components/resume'
import Portfolio from '@/components/portfolio'
import ContactForm from '@/components/contactForm'
import { useState } from 'react'

export default function Home() {

  // const [user, setUser] = {
  //   user: {
  //     id: 1,
  //     email: "reachdarshanv@gmail.com",
  //     name: "Darshan V",
  //     password: "darshan",
  //     address: "",
  //     photoURL: "",
  //     gender: "male",
  //     shortDesc: "Full stack developer",
  //     phone: "+91 8431143130",
  //     birthday: "23 Sep 2002",
  //     about: "A self-taught , quality-focused and passionate software developer interested in the field of Web development",
  //   },
  //   SocialLinks: [
  //     {
  //       email: "reachdarshanv@gmail.com",
  //       linkName: "linkedin",
  //       url: "https://www.linkedin.com/in/darshan-v-793b71234/"
  //     },
  //     {
  //       email: "reachdarshanv@gmail.com",
  //       linkName: "GitHub",
  //       url: "https://github.com/DARSHAN-THE-CODER"
  //     }
  //   ],
  //   projects: [
  //     {
  //       name: "Todo Website",
  //       description: "to-do list website to manage tasks effectively",
  //       github: "https://github.com/DARSHAN-THE-CODER",
  //       category: "Web development",
  //       techUsed: ["react", "express", "mongoose", "node js"],
  //       date: "30 Jan 2023",
  //       thumbnail: "https://codingnepalweb.com/wp-content/uploads/2021/05/img_6092ae49e2e72.jpg"
  //     },
  //     {
  //       name: "Todo Website",
  //       description: "to-do list website to manage tasks effectively",
  //       github: "https://github.com/DARSHAN-THE-CODER",
  //       category: "Web development",
  //       techUsed: ["react", "express", "mongoose", "node js"],
  //       date: "30 Jan 2023",
  //       thumbnail: "https://codingnepalweb.com/wp-content/uploads/2021/05/img_6092ae49e2e72.jpg"
  //     }
  //   ],
  // education: [
  //   {
  //     priority: 1,
  //     from: 2010,
  //     to: 2012,
  //     institution: "XYZ institution, davanagere",
  //     description: "lorel epsum ",
  //     percentage: "80%"
  //   },
  //   {
  //     priority: 2,
  //     from: 2012,
  //     to: 2015,
  //     institution: "XYZ institution, Bangalore",
  //     description: "lorel epsum xyzz ijdc ijdnc wi",
  //     percentage: "89%"
  //   }
  // ],
  // experience: [
  //   {
  //     priority: 1,
  //     from: 2020,
  //     to: 2022,
  //     company: "XYZ institution, Bangalore",
  //     description: "lorel epsum xyzz ijdc ijdnc wi",
  //     role: "SDE"
  //   },
  //   {
  //     priority: 2,
  //     from: 2022,
  //     to: 2023,
  //     company: "XYZ institution, Bangalore",
  //     description: "lorel epsum xyzz ijdc ijdnc wi",
  //     role: "SDE 2"
  //   }
  // ]
  // }

  let user = {
    user: {

      id: 1,
      email: "reachdarshanv@gmail.com",
      name: "Darshan V",
      password: "darshan",
      address: "",
      photoURL: "",
      gender: "male",
      shortDesc: "Full stack developer",
      phone: "+91 8431143130",
      birthday: "23 Sep 2002",
      about: ["A self-taught , quality-focused and passionate software developer interested in the field of Web development", "I love to solve real world problems"]
    }
  }

  let aboutCards = [{
    title: "Web Design",
    description: "The most modern and high-quality design made at a professional level"
  }, {
    title: "Mobile Apps",
    description: "The most modern and high-quality design made at a professional level"
  },
  {
    title: "Photography",
    description: "The most modern and high-quality design made at a professional level"
  }]

  let projects = [
    {
      name: "Todo Website",
      description: "to-do list website to manage tasks effectively",
      github: "https://github.com/DARSHAN-THE-CODER",
      category: "Web development",
      techUsed: ["react", "express", "mongoose", "node js"],
      date: "30 Jan 2023",
      thumbnail: "https://codingnepalweb.com/wp-content/uploads/2021/05/img_6092ae49e2e72.jpg",
      liveLink: ""
    },
    {
      name: "Todo Website",
      description: "to-do list website to manage tasks effectively",
      github: "https://github.com/DARSHAN-THE-CODER",
      category: "Web development",
      techUsed: ["react", "express", "mongoose", "node js"],
      date: "30 Jan 2023",
      thumbnail: "https://learn.microsoft.com/en-us/azure/app-service/media/tutorial-java-spring-cosmosdb/spring-todo-app-running-locally.jpg",
      liveLink:""
    }
  ]
  const [activeNav, setActiveNav] = useState("About")
  return (
    <>
      <main>
        <Sidebar user={user} />
        <div className="main-content">
          <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
          <About activeNav={activeNav} {...user.user} />
          <Resume activeNav={activeNav} />
          <Portfolio activeNav={activeNav} projects={projects} />
          <ContactForm activeNav={activeNav}/>
        </div>
      </main>
    </>
  )
}
