import { APIURL } from '@/utils/api.utils';
import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function ContactForm({ activeNav, username }) {

    const [response, setResponse] = useState({senderName:"", senderMail:"", message:""})

    function checkEmpty(){
        return response?.senderName?.toString().trim() === "" || response?.senderMail?.toString().trim() === "" || response?.message?.toString().trim() === "" ;
    }
    function handleContactForm() {

        let temp = response;
        console.log(temp)
        console.log(response)
        console.log(checkEmpty())
        if ( !checkEmpty()) {
            axios.post(`${APIURL}/user/form-response/${username}`, { data: temp })
            .then((res) => {
                console.log(res.data)
                setResponse((prev) => ({senderName:"", senderMail:"", message:""}) )
                toast.success("Submitted successfully")
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong")
            })
        } else {
            return toast.error("Please fill all the fields")
        }
    }

    return (
        <article className={`contact ${activeNav === "Contact" ? "active" : ""}`} data-page="contact">

            <header>
                <h2 className="h2 article-title">Contact</h2>
            </header>

            <section className="contact-form">

                <h3 className="h3 form-title">Contact Form</h3>

                {/* <form action="#" className="form" data-form > */}

                    <div className="input-wrapper">
                        <input type="text" name="fullname" className="form-input" placeholder="Full name" required data-form-input value={response?.name}
                            onChange={(e) => (setResponse((prev) => ({ ...prev, senderName: e.target.value })))}
                        />

                        <input type="email" name="email" className="form-input" placeholder="Email address" required data-form-input
                            onChange={(e) => (setResponse((prev) => ({ ...prev, senderMail: e.target.value })))}
                        />
                    </div>

                    <textarea name="message" className="form-input" placeholder="Your Message" required data-form-input
                        value={response?.message}
                        onChange={(e) => (setResponse((prev) => ({ ...prev, message: e.target.value })))}
                    />

                    <button className="form-btn" type="submit" onClick={() => handleContactForm()} data-form-btn>
                        <ion-icon name="paper-plane"></ion-icon>
                        <span>Send Message</span>
                    </button>

                {/* </form> */}

            </section>

        </article>
    )
}

export default ContactForm