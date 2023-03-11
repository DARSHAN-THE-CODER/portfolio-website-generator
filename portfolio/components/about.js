// import {ion-icon} from "@ionic/react"

function About({ about, activeNav }) {

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


    return (
        <article class={`about ${activeNav === "About" ? "active" : ""}`} data-page="about">
            <header>
                <h2 class="h2 article-title">About me</h2>
            </header>
            <figure class="w-full m-auto flex justify-center mb-10">
                <img src='https://i.ibb.co/42fb14D/New-doc-07-Mar-2023-6-22-pm.jpg' alt='dsjc' style={{ height: "300px", borderRadius: "30px" }} loading="lazy" />
            </figure>
            <section class="about-text">
                {
                    about?.map((a, index) => (
                        <p key={index}>
                            {a}
                        </p>
                    ))
                }
            </section>

            <section class="service">

                <h3 class="h3 service-title">What i'm doing</h3>

                <ul class="service-list">
                    {
                        aboutCards?.map((card, index) => (
                            <li class="service-item" key={index}>
                                <div class="service-content-box">
                                    <h4 class="h4 service-item-title">{card?.title}</h4>

                                    <p class="service-item-text">
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