import { APIURL } from '@/utils/api.utils'
import axios from 'axios'
import { basePath } from 'next.config'
import React from 'react'
import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';
import ProjectsInput from '../form/ProjectsInput'
import Portfolio from '../portfolio'
import SocialLinksInput from '../form/SocialLinks'

function ProjectsForm({ activeNav, username }) {
    // const [username, setUsername] = useState("")

    const router = useRouter();

    const [projects, setProjects] = useState([{ id: 0, name: "", description: "", github: "", category: "", date: "", thumbnail: "", liveLink: "", techUsed: [] }])
    const [socialLinks, setSocialLinks] = useState([{ id: 0, linkName: "", url: "" }])

    const [projId, setProjId] = useState(1)
    const [linkId, setLinkId] = useState(1)

    useEffect(() => {

        if (username) {
            axios.get(`${APIURL}/user/username/${username}`)
                .then((res) => {
                    // console.log(res)
                    if (res.status === 200) {
                        axios.get(`${APIURL}/user/${username}`)
                            .then((res) => {
                                console.log(res.data.projects)
                                setProjId(Number(res.data.projects[res.data.projects.length - 1]?.id + 1) || 1)
                                setProjects(res.data.projects)

                                setLinkId(Number(res.data.socialLinks[res.data.socialLinks.length - 1]?.id + 1) || 1)
                                setSocialLinks(res.data.socialLinks)
                            }
                            )
                    }
                    else {
                        return toast.error(`No user found with username ${username}`)
                        // router.push('https://www.mytechfolio.tech');
                        // router.push('http://www.mytechfolio.tech');
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [username])

    // for education records
    const handleInputChange = (id, field, value) => {
        setProjects((prevState) =>
            prevState.map((inputSet) =>
                inputSet.id === id ? { ...inputSet, [field]: value } : inputSet
            )
        );
    };

    const handleAddInput = () => {
        setProjects((prevState) => [
            ...prevState,
            { id: projId, name: "", description: "", github: "", category: "", date: "", thumbnail: "", liveLink: "", techUsed: "" },
        ]);
        setProjId((prevState) => prevState + 1);
    };

    const handleRemoveInputSet = (id) => {
        if (projects.length === 1) return
        setProjects((prevState) => prevState.filter((inputSet) => inputSet.id !== id));
    };

    function handleSaveProjects() {
        let temp = projects;

        const hasEmptyValues = temp.some(obj =>
            Object.values(obj).some(value => {
                const trimmedValue = value.toString().trim();
                console.log(trimmedValue.length)
                return trimmedValue === "" || trimmedValue === null || trimmedValue === undefined || trimmedValue.length === 0;
            })
        );
        console.log(hasEmptyValues)
        console.log(temp)
        if (hasEmptyValues) {
            return toast.error("Please fill all the fields")
        } else {
            temp.forEach((item) => { delete item.id; delete item?.username })
            axios.post(`${APIURL}/projects/${username}`, { data: temp })
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        toast.success("Projects details saved successfully")
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Something went wrong")
                })
        }
    }


    // for social links
    const handleLinksInputChange = (id, field, value) => {
        setSocialLinks((prevState) =>
            prevState.map((inputSet) =>
                inputSet.id === id ? { ...inputSet, [field]: value } : inputSet
            )
        );
    };

    const handleLinksAddInput = () => {
        setSocialLinks((prevState) => [
            ...prevState,
            { id: linkId, linkName: "", url: "" },
        ]);
        setLinkId((prevState) => prevState + 1);
    };

    const handleRemoveInputLinksSet = (id) => {
        if (socialLinks.length === 1) return
        setSocialLinks((prevState) => prevState.filter((inputSet) => inputSet.id !== id));
    };

    const handleSaveSocialLinks = () => {
        let temp = socialLinks;
        const hasEmptyValues = temp.some(obj =>
            Object.values(obj).some(value => {
                const trimmedValue = value.toString().trim();
                console.log(trimmedValue.length)
                return trimmedValue === "" || trimmedValue === null || trimmedValue === undefined || trimmedValue.length === 0;
            })
        );
        console.log(hasEmptyValues)
        console.log(temp)
        if (hasEmptyValues) {
            return toast.error("Please fill all the fields")
        } else {
            temp.forEach((item) => { delete item.id; delete item?.username })
            axios.post(`${APIURL}/user/social-links/${username}`, { data: temp })
                .then((res) => {
                    console.log(res)
                    if (res.status === 201) {
                        toast.success("Social Links details saved successfully")
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Something went wrong")
                })
        }
    }
    return (
        <article className={`resume ${activeNav === "PortfolioForm" ? "active" : ""}`} data-page="portfolio">
            <header>
                <h2 className="h2 article-title">Enter Projects details</h2>
            </header>
            <div className='flex flex-col'>
                <section className=''>
                    <Portfolio projects={projects} activeNav={"Portfolio"} />
                </section>
                <section className=' m-auto flex w-full p-3 justify-evenly '>
                    <form className="form" target="_blank">
                        <div className='flex md:flex-row flex-col '>
                            <div className='text-white h-[80vh] w-full md:w-[50vw] overflow-auto border-2 rounded-xl p-3 m-2'>
                                <p>Enter Project details</p>
                                <div className='flex flex-col md:flex-row justify-evenly'>
                                    <button
                                        type="button"
                                        onClick={handleAddInput}
                                        className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Add +
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleSaveProjects}
                                        className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Save details
                                    </button>
                                </div>
                                {
                                    projects?.map((inputSet, index) => (
                                        <ProjectsInput
                                            key={inputSet.id}
                                            id={inputSet.id}
                                            name={inputSet.name}
                                            description={inputSet.description}
                                            github={inputSet.github}
                                            category={inputSet.category}
                                            date={inputSet.date}
                                            thumbnail={inputSet.thumbnail}
                                            liveLink={inputSet.liveLink}
                                            techUsed={inputSet.techUsed}
                                            number={index + 1}
                                            onInputChange={handleInputChange}
                                            onRemoveClick={handleRemoveInputSet}
                                        />
                                    ))
                                }
                            </div>
                            <div className='text-white h-[80vh] overflow-auto border-2 rounded-xl p-3 m-2'>
                                <p>Enter Links , Ex: github, linkedin</p>
                                <div className='flex flex-col md:flex-row justify-evenly'>
                                    <button
                                        type="button"
                                        onClick={handleLinksAddInput}
                                        className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Add +
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleSaveSocialLinks}
                                        className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Save details
                                    </button>
                                </div>
                                {
                                    socialLinks?.map((inputSet, index) => (
                                        <SocialLinksInput
                                            key={inputSet.id}
                                            id={inputSet.id}
                                            linkName={inputSet.linkName}
                                            url={inputSet.url}
                                            number={index + 1}
                                            onInputChange={handleLinksInputChange}
                                            onRemoveClick={handleRemoveInputLinksSet}
                                        />
                                    ))
                                }
                            </div>
                        </div>

                    </form>
                </section>

            </div>
        </article>
    )
}

export default ProjectsForm