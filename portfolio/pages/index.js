import { useState, useEffect } from 'react'

import axios from 'axios'
import { APIURL } from '@/utils/api.utils'
import MainPage from './main'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function Home() {

  const [isDomain, setIsDomain] = useState(false)
  const [username, setUsername] = useState("")
  const router = useRouter()

  useEffect(() => {
    let location = window.location.hostname;
    let check = location.split(".");
    console.log(check)
    if (check[0] !== "localhost") {
      axios.get(`${APIURL}/user/username/${check[0]}`)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setUsername(check[0])
            setIsDomain(true)
          }
          else {
            toast.error(`No user found with username ${check[0]}`)
            router.push('/');
            return
          }
        })
        .catch((err) => {
          console.log(err)
        })

    } else {

    }
  }, [])

  return (
    <>

      {
        isDomain ? <MainPage username={username} />
          :
          (
            <div className='text-white m-auto w-full h-full'>
              <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div class="container flex flex-wrap items-center justify-between mx-auto">
                  {/* <a href="http://videoconf.darshanv.me/" class="flex items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2zfAREgkmbvcbWq8CfWYnRK1TIQ2PD3QKcg&usqp=CAU" class="rounded-full" alt="Logo" width={40} height={40} />
                  </a> */}
                  <div class="flex md:order-2 gap-2">
                    <button
                      type='button'
                      // onClick={() => handleSaveBasic()}
                      className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      Login
                    </button>
                    <button
                      type='button'
                      // onClick={() => handleSaveBasic()}
                      className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </nav>
              You are at right place :)
              <footer class="p-4 absolute bg-white rounded-lg flex justify-between flex-col shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 bottom-0 w-full">
                <div class="sm:flex sm:items-center sm:justify-between w-full ">
                  <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 text-center mb-4 md:mb-0">© 2023 All Rights Reserved.
                  </span>
                  <div class="text-sm flex justify-center text-center font-bold">This site is built with <span className='text-pink-700 ml-1 mr-1'>♥</span> by <a href="mailto:reachdarshanv@gmail.com" className='italic ml-2'>Darshan V</a>
                  </div>
                  <div class="flex justify-center mt-4 md:mt-0 md:float-right md:right-0">
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
