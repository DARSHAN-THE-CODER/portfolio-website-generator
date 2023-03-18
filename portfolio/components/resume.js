import Script from 'next/script'

function Resume({activeNav, education, experience, skills, isPreview=false}) {
    return (
        <article className={`resume ${activeNav === "Resume" ? "active" : ""}`} data-page="resume">
            <header>
                <h2 className="h2 article-title">Resume {isPreview && ("(Preview)")}</h2>
            </header>

            <section className="timeline">

                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon icon="book-outline"></ion-icon>
                    </div>

                    <h3 className="h3">Education</h3>
                </div>

                <ol className="timeline-list">
                    {
                        education?.map((edu, index) => (
                            <li className="timeline-item" key={index}>

                                <h4 className="h4 timeline-item-title flex">{edu.institution} {"   "}<span className='ml-4 italic'>{edu.percentage}</span></h4>

                                <span>{edu.from} - {edu.to}</span>

                                <p className="timeline-text">
                                    {edu.description}
                                </p>

                            </li>
                        ))
                    }
                </ol>

            </section>

            <section className="timeline">

                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon icon="book-outline" />
                    </div>

                    <h3 className="h3">Experience</h3>
                </div>

                <ol className="timeline-list">
                    {
                        experience?.map((exp, index) => (
                            <li className="timeline-item" key={index}>

                                <h4 className="h4 timeline-item-title">{exp.role}</h4>
                                <h5 className="timeline-text timeline-item-title">{exp.company}</h5>
                                <span>{exp.from} - {exp.to}</span>

                                <p className="timeline-text">
                                    {exp.description}
                                </p>
                            </li>
                        ))
                    }
                </ol>
            </section>

            <section className="skill">

                <h3 className="h3 skills-title">My skills</h3>

                <ul className="skills-list content-card">
                    {
                        skills?.map((skill, index) => (
                            <li className="skills-item" key={index}>

                                <div className="title-wrapper">
                                    <h5 className="h5">{skill.title}</h5>
                                    <data value={skill.percentage}>{skill.percentage}%</data>
                                </div>
                                <div className="skill-progress-bg">
                                    <div className="skill-progress-fill" style={{ "width": `${skill.percentage}%` }}></div>
                                </div>
                            </li>
                        ))
                    }
                </ul>

            </section>
            <section>
            </section>
        </article>
    )
}

export default Resume