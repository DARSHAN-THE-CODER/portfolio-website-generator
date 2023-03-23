import { useState, useEffect } from 'react'

import axios from 'axios'
import { APIURL } from '@/utils/api.utils'
import MainPage from './main'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Loader from '@/components/common/loader'

import LandingPage from '@/components/landing/landing'
// https://stickers.wiki/telegram/search/?q=memoji

export default function Home() {

  const [isDomain, setIsDomain] = useState(false)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(true);

  const router = useRouter()
  var console = {};
  console.log = function () { };

  useEffect(() => {
    let location = window.location.hostname;
    let check = location.split(".");
    console.log(check)
    if (check[0] !== "mytechfolio" && check[0] !== "localhost") {
      axios.get(`${APIURL}/user/username/${check[0]}`)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setUsername(check[0])
            setIsDomain(true)
            setLoading(false)
          }
          else {
            toast.error(`No user found with username ${check[0]}`)
            setLoading(false)
            router.push('/');
            return
          }
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })

    } else {
      setLoading(false)
    }
  }, [])

  function handlePush(term) {
    if (term === "login") {
      router.push("/auth/login")
    } else {
      router.push("/auth/register")
    }
  }
  return (
    <>

      {
        loading ?
          <Loader title={"Fetching details"} description={"Hang on just a moment , we are fetching details. Thank you for your patience!"} />
          :
          isDomain ? <MainPage username={username} />
            :
            (
              <div className='text-white m-auto w-full h-full'>
                <LandingPage />
                <footer class="p-4 absolute rounded-lg flex justify-between flex-col shadow md:flex md:items-center md:justify-between md:p-6  bottom-0 w-full [backdrop-filter:blur(10px)]">
                  <div class="sm:flex sm:items-center sm:justify-between w-full ">
                    <span class="text-sm text-gray-400 sm:text-center text-center mb-4 md:mb-0">© 2023 All Rights Reserved.
                    </span>
                    <div class="text-lg flex justify-center text-center font-bold">This site is built with <span className='text-pink-700 ml-1 mr-1'>♥</span> by <a href="mailto:reachdarshanv@gmail.com" className='italic ml-2'>Darshan V</a>
                    </div>
                    <div className="flex justify-center mt-4 md:mt-0 md:float-right md:right-0">
                      <ul className="social-list">
                        <li className="social-item">
                          <a href={"https://www.linkedin.com/in/darshan-v-793b71234/"} target="_blank" className="icon-box">
                            <ion-icon className='mt-4 hover:text-white' name={`logo-linkedin`}></ion-icon>
                          </a>
                        </li>
                        <li className="social-item">
                          <a href={"https://github.com/DARSHAN-THE-CODER"} target="_blank" className="icon-box">
                            <ion-icon className='mt-4 hover:text-white' name={`logo-github`}></ion-icon>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </footer>
              </div>
            )
      }
    </>
  )
}
