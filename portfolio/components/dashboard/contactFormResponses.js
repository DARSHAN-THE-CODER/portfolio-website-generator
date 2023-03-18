import { APIURL } from '@/utils/api.utils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Head from 'next/head'

function ContactFormResponses({ username, activeNav }) {

    const [formResponses, setFormResponses] = useState([])

    useEffect(() => {
        if (username) {
            axios.get(`${APIURL}/user/form-response/${username}`)
                .then((res) => {
                    console.log(res.data)
                    setFormResponses(res.data)
                })
                .catch((err) => {
                    console.log(err)
                }
                )
        }
    }, [username])

    function handleRemove(response) {
        console.log(response)

        axios.delete(`${APIURL}/user/form-response/id/${response?.id}`)
            .then((res) => {
                toast.success("Form response deleted successfully")
                setFormResponses(() => formResponses?.filter((formResponse) => formResponse != response))
            })
            .catch((err) => {
                toast.error("Failed to delete !")
            })
    }
    return (
        <article className={`contact ${activeNav === "ContactFormResponses" ? "active" : ""}`} data-page="contact">
            <Head>
                <title>Form responses</title>
            </Head>
            <header>
                <h2 className="h2 article-title">Your messages !</h2>
            </header>
            <p className="xd italic cursor-pointer hover:underline w-min mb-4">
                <a href={`https://${username}.mytechfolio.live/`} target="_blank">https://{username}.mytechfolio.live/</a>
            </p>
            {
                (formResponses?.length > 0) ? (
                    <ul className='flex flex-wrap'>
                        {
                            formResponses?.map((response, index) => (
                                <li key={index} className='service-item text-white m-4'>
                                    <div className="card w-full">
                                        <div className='ml-2 mt-7 px-2 py-1 w-max flex justify-end items-end float-right m-auto cursor-pointer text-center bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400'
                                            onClick={() => handleRemove(response)}
                                        >
                                            Remove
                                        </div>
                                        <div className="card-header">
                                            <h4>Name: {response.senderName}</h4>
                                        </div>

                                        <div className="card-body mb-4">
                                            <a href={`mailto:${response.senderMail}`} className='text-blue-500'>{response.senderMail}</a>
                                        </div>
                                        <hr></hr>
                                        <div className="card-footer mt-4">
                                            <p className="card-text">{response.message}</p>
                                        </div>
                                    </div>
                                </li>
                            )
                            )
                        }
                    </ul>
                ) : (
                    <div className='text-white m-auto text-center italic font-serif'>
                        You've got no messages in your inbox :(
                    </div>
                )
            }

            {/* </section> */}
        </article>
    )
}

export default ContactFormResponses