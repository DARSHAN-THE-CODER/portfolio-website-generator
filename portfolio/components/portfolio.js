import { useState } from "react"


function Portfolio({ projects, activeNav }) {
    const [activeProject, setActiveProject] = useState({ status: false, pro: {} })

    return (
        <article className={`portfolio ${activeNav === "Portfolio" ? "active" : ""}`} data-page="portfolio">

            {activeProject.status ? (
                <section className="projects">
                    <header className="flex">
                        <span className="icon-box mr-3 cursor-pointer hover:shadow-lg" onClick={() => (setActiveProject({ status: false }))}>
                            <ion-icon name="arrow-back"></ion-icon>
                        </span>
                        <h2 className="h2 article-title">{activeProject?.pro?.name}</h2>
                    </header>
                    <figure className="w-full m-auto flex justify-center mb-10">
                        <img src={activeProject?.pro?.thumbnail} alt='dsjc' style={{ height: "300px", borderRadius: "30px" }} loading="lazy" />
                    </figure>

                    <p className="contact-title flex">Project completed date : <span className="text-[white] ml-2">{activeProject.pro.date} </span></p>

                    <section className="flex flex-wrap mt-2">
                        <a href={activeProject?.pro?.github} target="_blank">
                            <div className="icon-box cursor-pointer">
                                <ion-icon name="logo-github"></ion-icon>
                            </div>
                        </a>
                        <a href={activeProject?.pro?.liveLink} target="_blank">
                            <div className="icon-box cursor-pointer">
                                <ion-icon name="pulse"></ion-icon>
                            </div>
                        </a>
                    </section>


                    <h2 className="project-title mt-3">{activeProject?.pro?.description}</h2>

                    <h3 class="h3 service-title m-4">Tech used </h3>
                    <div className="flex flex-wrap w-full">
                        {
                            activeProject?.pro?.techUsed?.map((tech, index) => (
                                <p className="active rounded-lg border-[1px] text-[white] p-2 m-2" key={index}>
                                    {tech}
                                </p>
                            ))
                        }
                    </div>

                </section>
            ) : (
                <section className="projects">
                    <header>
                        <h2 className="h2 article-title">Portfolio</h2>
                    </header>
                    <ul className="project-list">
                        {
                            projects?.map((project, index) => (
                                <li className="project-item  active" data-filter-item data-category="web development" key={index}>

                                    <a href="#">
                                        <figure className="project-img" onClick={() => (setActiveProject({ status: true, pro: project }))}>
                                            <div className="project-item-icon-box">
                                                <ion-icon name="eye-outline"></ion-icon>
                                            </div>
                                            <figure className="w-full m-auto flex justify-center">
                                                <img src={project?.thumbnail} style={{ height: "200px", borderRadius: "30px", objectFit: "cover" }} alt={project?.category} loading="lazy" />
                                            </figure>
                                        </figure>

                                        <h3 className="project-title">{project?.name}</h3>
                                        <p className="project-category">{project?.category}</p>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>

                </section>
            )}
        </article>
    )
}

export default Portfolio