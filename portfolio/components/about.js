import Head from "next/head"

function About({ about, activeNav, username, aboutCards, photoURL }) {

    return (
        <article className={`about ${activeNav === "About" ? "active" : ""}`} data-page="about">
            <Head>
                <title>Awesome Portfolio | Build free portfolio website</title>
                <meta name="description" content="Build free portfolio website" />
                <meta property="og:image" content="https://i.ibb.co/vHQFXJK/dv.jpg" />
            </Head>
            <header>
                <h2 className="h2 article-title">About me</h2>
            </header>
            <figure className="w-full m-auto flex justify-center mb-10">
                <img src={photoURL} alt='dsjc' style={{ height: "300px", borderRadius: "30px" }} loading="lazy" />
            </figure>
            <section className="about-text" dangerouslySetInnerHTML={{ __html: about }}>
                {/* <p >
                    {about}
                </p> */}
            </section>

            <section className="service">

                <h3 className="h3 service-title">What i'm doing</h3>

                <ul className="service-list">
                    {
                        aboutCards?.map((card, index) => (
                            <li className="service-item" key={index}>
                                <div className="service-content-box">
                                    <h4 className="h4 service-item-title">{card?.title}</h4>

                                    <p className="service-item-text" dangerouslySetInnerHTML={{ __html: card?.description }}>
                                        {/* {card?.description} */}
                                    </p>
                                </div>
                            </li>
                        ))
                    }
                </ul>

            </section>

        </article>
    )
}

export default About