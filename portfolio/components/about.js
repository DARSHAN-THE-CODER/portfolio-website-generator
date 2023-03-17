// import {ion-icon} from "@ionic/react"

function About({ about, activeNav, username, aboutCards }) {

    // let aboutCards = [{
    //     title: "Web Design",
    //     description: "The most modern and high-quality design made at a professional level"
    // }, {
    //     title: "Mobile Apps",
    //     description: "The most modern and high-quality design made at a professional level"
    // },
    // {
    //     title: "Photography",
    //     description: "The most modern and high-quality design made at a professional level"
    // }]


    return (
        <article className={`about ${activeNav === "About" ? "active" : ""}`} data-page="about">
            <header>
                <h2 className="h2 article-title">About me</h2>
            </header>
            <figure className="w-full m-auto flex justify-center mb-10">
                <img src='https://i.ibb.co/42fb14D/New-doc-07-Mar-2023-6-22-pm.jpg' alt='dsjc' style={{ height: "300px", borderRadius: "30px" }} loading="lazy" />
            </figure>
            <section className="about-text">
                        <p >
                            {about}
                        </p>
            </section>

            <section className="service">

                <h3 className="h3 service-title">What i'm doing</h3>

                <ul className="service-list">
                    {
                        aboutCards?.map((card, index) => (
                            <li className="service-item" key={index}>
                                <div className="service-content-box">
                                    <h4 className="h4 service-item-title">{card?.title}</h4>

                                    <p className="service-item-text">
                                        {card?.description}
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