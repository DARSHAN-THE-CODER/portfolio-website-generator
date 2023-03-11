import Script from 'next/script'

function Resume({activeNav}) {
    let education = [
        {
            priority: 1,
            from: 2010,
            to: 2012,
            institution: "XYZ institution, davanagere",
            description: "lorel epsum ",
            percentage: "80%"
        },
        {
            priority: 2,
            from: 2012,
            to: 2015,
            institution: "XYZ institution, Bangalore",
            description: "lorel epsum xyzz ijdc ijdnc wi",
            percentage: "89%"
        }
    ]

    let experience = [
        {
            priority: 1,
            from: 2020,
            to: 2022,
            company: "XYZ institution, Bangalore",
            description: "lorel epsum xyzz ijdc ijdnc wi",
            role: "SDE"
        },
        {
            priority: 2,
            from: 2022,
            to: 2023,
            company: "XYZ institution, Bangalore",
            description: "lorel epsum xyzz ijdc ijdnc wi",
            role: "SDE 2"
        }
    ]

    let skills = [
        {
            name: "Web Development",
            percentage: "90"
        },
        {
            name: "C++",
            percentage: "70"
        },
        {
            name: "AWS",
            percentage: "50"
        }
    ]
    return (
        <article className={`resume ${activeNav === "Resume" ? "active" : ""}`} data-page="resume">
            <header>
                <h2 className="h2 article-title">Resume</h2>
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

                                <h4 className="h4 timeline-item-title">{edu.institution}</h4>

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
                                    <h5 className="h5">{skill.name}</h5>
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

        </article>
    )
}

export default Resume