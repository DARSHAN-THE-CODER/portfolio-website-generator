import { APIURL } from '@/utils/api.utils'
import axios from 'axios'
import { basePath } from 'next.config'
import React from 'react'
import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import EducationInputSet from '../form/EducationInput'
import ExperienceInputSet from '../form/ExperienceInput'
import SkillsInput from '../form/SkillsInput'
import Resume from '../resume'

import { useRouter } from 'next/router';
import Loader from '../common/loader'

function ResumeForm({ activeNav, username }) {

    // const [username, setUsername] = useState("")

    const router = useRouter();

    const [resume, setResume] = useState()
    const [education, setEducation] = useState([{ id: 0, institution: "", priority: 0, from: "", to: "", description: "", percentage: "" }])
    const [experience, setExperience] = useState([{ id: 0, company: "", priority: 0, from: "", to: "", description: "", role: "" }])
    const [skills, setSkills] = useState([{ id: 0, title: "", percentage: "" }])

    const [edId, setEdId] = useState(1)
    const [expId, setExpId] = useState(1)
    const [skillId, setSkillId] = useState(1)
    const [loading, setLoading] = useState(false)
    console.log(edId)

    useEffect(() => {

        if (username) {
            axios.get(`${APIURL}/user/username/${username}`)
            .then((res) => {
                // console.log(res)
                if (res.status === 200) {
                    axios.get(`${APIURL}/user/${username}`)
                        .then((res) => {
                            // console.log(res.data)
                            // console.log(res.data.skills.length);
                            // console.log(res.data.skills[res.data.skills.length - 1]?.id)

                            setEdId(Number(res?.data?.education[res?.data?.education?.length - 1]?.id + 1) || 1)
                            setExpId(Number(res?.data?.experience[res?.data?.experience?.length - 1]?.id + 1) || 1)
                            setSkillId(Number(res.data.skills[res.data.skills.length - 1]?.id + 1) || 1)

                            setEducation(res.data.education)
                            setExperience(res.data.experience)
                            setSkills(res.data.skills)
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
    const handleEducationInputChange = (id, field, value) => {
        setEducation((prevState) =>
            prevState.map((inputSet) =>
                inputSet.id === id ? { ...inputSet, [field]: value } : inputSet
            )
        );
    };

    const handleAddEducationInput = () => {
        setEducation((prevState) => [
            ...prevState,
            { id: edId, institution: "", priority: edId, from: "", to: "", description: "", percentage: "" },
        ]);
        setEdId((prevState) => prevState + 1);
    };

    const handleRemoveEducationInputSet = (id) => {
        if (education.length === 1) return
        setEducation((prevState) => prevState.filter((inputSet) => inputSet.id !== id));
    };

    // for experience records
    const handleExperienceInputChange = (id, field, value) => {
        setExperience((prevState) =>
            prevState.map((inputSet) =>
                inputSet.id === id ? { ...inputSet, [field]: value } : inputSet
            )
        );
    };

    const handleAddExperienceInput = () => {
        setExperience((prevState) => [
            ...prevState,
            { id: expId, company: "", priority: expId, from: "", to: "", description: "", role: "" },
        ]);
        setExpId((prevState) => prevState + 1);
    };

    const handleRemoveExperienceInputSet = (id) => {
        if (experience.length === 1) return
        setExperience((prevState) => prevState.filter((inputSet) => inputSet.id !== id));
    };

    // for skills records

    const handleSkillsInputChange = (id, field, value) => {
        setSkills((prevState) =>
            prevState.map((inputSet) =>
                inputSet.id === id ? { ...inputSet, [field]: value } : inputSet
            )
        );
    };

    const handleAddSkillsInput = () => {
        setSkills((prevState) => [
            ...prevState,
            { id: skillId, title: "", percentage: "" },
        ]);
        setSkillId((prevState) => prevState + 1);
    };

    const handleRemoveSkillsInputSet = (id) => {
        if (skills.length === 1) return
        setSkills((prevState) => prevState.filter((inputSet) => inputSet.id !== id));
    };



    function handleSubmit(e) {
        e.preventDefault()
        console.log("submitted")
    }

    function handleSaveEducation() {
        console.log(education)
        let temp = education;
        setLoading(true)
        console.log(temp)

        const hasEmptyValues = temp.some(obj =>
            Object.values(obj).some(value => {
                const trimmedValue = value.toString().trim();
                console.log(trimmedValue.length)
                return trimmedValue === "" || trimmedValue === null || trimmedValue === undefined || trimmedValue.length === 0;
            })
        );
        console.log(hasEmptyValues)
        if (hasEmptyValues) {
            setLoading(false);
            return toast.error("Please fill all the fields")
        } else {
            temp.forEach((item) => { delete item.id; delete item?.username })
            axios.post(`${APIURL}/education/${username}`, { data: temp })
                .then((res) => {
                    console.log(res)
                    setLoading(false);
                    toast.success("Education details saved")
                }
                )
                .catch((err) => {
                    console.log(err)
                    setLoading(false);
                    toast.error("Error saving education details")
                }
                )
        }
    }

    function handleSaveExperience() {
        console.log(experience)
        let temp = experience;
        console.log(temp)
        setLoading(true)

        const hasEmptyValues = temp.some(obj =>
            Object.values(obj).some(value => {
                const trimmedValue = value.toString().trim();
                console.log(trimmedValue.length)
                return trimmedValue === "" || trimmedValue === null || trimmedValue === undefined || trimmedValue.length === 0;
            })
        );
        console.log(hasEmptyValues)
        if (hasEmptyValues) {
            setLoading(false)
            return toast.error("Please fill all the fields")
        } else {
            temp.forEach((item) => { delete item.id; delete item?.username })
            axios.post(`${APIURL}/experience/${username}`, { data: temp })
                .then((res) => {
                    console.log(res)
                    setLoading(false)
                    toast.success("Experience details saved")
                }
                )
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                    toast.error("Error saving experience details")
                }
                )
        }
    }

    function handleSaveSkills() {
        console.log(skills)
        let temp = skills;
        setLoading(true)

        const hasEmptyValues = temp.some(obj =>
            Object.values(obj).some(value => {
                const trimmedValue = value.toString().trim();
                console.log(trimmedValue.length)
                return trimmedValue === "" || trimmedValue === null || trimmedValue === undefined || trimmedValue.length === 0;
            })
        );
        console.log(hasEmptyValues)
        if (hasEmptyValues) {
            setLoading(false);
            return toast.error("Please fill all the fields")
        }
        else {
            temp.forEach((item) => { delete item.id; delete item?.username })
            axios.post(`${APIURL}/user/skills/${username}`, { data: temp })
                .then((res) => {
                    console.log(res)
                    setLoading(false);
                    toast.success("Skills details saved")
                }
                )
                .catch((err) => {
                    console.log(err)
                    setLoading(false);
                    toast.error("Error saving skills details")
                }
                )
        }
    }

    return (
        <article className={`resume ${activeNav === "ResumeForm" ? "active" : ""}`} data-page="resume">
            <header>
                <h2 className="h2 article-title">Enter details</h2>
            </header>
            <p className="xd italic cursor-pointer hover:underline w-min mb-4">
                <a href={`https://${username}.mytechfolio.live/`} target="_blank">https://{username}.mytechfolio.live/</a>
            </p>
            <div className='flex flex-col-reverse'>
                <section className='m-auto flex justify-evenly'>
                    <form className="form" onSubmit={handleSubmit} target="_blank">
                        <div className='flex md:flex-row flex-col '>
                            <div className='text-white h-[80vh] overflow-auto border-2 rounded-xl p-3 m-2'>
                                <p>Enter education details</p>
                                <div className='flex flex-col md:flex-row justify-evenly'>
                                    <button
                                        type="button"
                                        onClick={handleAddEducationInput}
                                        className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Add +
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleSaveEducation}
                                        className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Save details
                                    </button>
                                </div>
                                {education?.map((inputSet, index) => (
                                    <EducationInputSet

                                        className="bg-gray-300"
                                        key={inputSet.id}
                                        id={inputSet.id}
                                        institution={inputSet.institution}
                                        description={inputSet.description}
                                        from={inputSet.from}
                                        to={inputSet.to}
                                        percentage={inputSet.percentage}
                                        onInputChange={handleEducationInputChange}
                                        onRemoveClick={handleRemoveEducationInputSet}
                                        number={index + 1}
                                    />
                                ))}
                            </div>

                            <div className='text-white h-[80vh] overflow-auto border-2 rounded-xl p-3 m-2'>
                                <p>Enter experience details</p>
                                <div className='flex flex-col md:flex-row justify-evenly'>
                                    <button
                                        type="button"
                                        onClick={handleAddExperienceInput}
                                        className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Add +
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleSaveExperience}
                                        className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Save details
                                    </button>
                                </div>
                                {experience?.map((inputSet, index) => (
                                    <ExperienceInputSet
                                        className="bg-gray-300"
                                        key={inputSet.id}
                                        id={inputSet.id}
                                        company={inputSet.company}
                                        description={inputSet.description}
                                        from={inputSet.from}
                                        to={inputSet.to}
                                        role={inputSet.role}
                                        onInputChange={handleExperienceInputChange}
                                        onRemoveClick={handleRemoveExperienceInputSet}
                                        number={index + 1}

                                    />
                                ))}
                            </div>

                            <div className='text-white h-[80vh] overflow-auto border-2 rounded-xl p-3 m-2'>
                                <p>Enter skills details</p>
                                <div className='flex flex-col justify-evenly'>

                                    <button
                                        type="button"
                                        onClick={handleAddSkillsInput}
                                        className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Add +
                                    </button>

                                    <button
                                        type='button'
                                        onClick={handleSaveSkills}
                                        className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Save details
                                    </button>
                                </div>
                                {skills?.map((inputSet, index) => (
                                    <SkillsInput
                                        className="bg-gray-300"
                                        key={inputSet.id}
                                        id={inputSet.id}
                                        title={inputSet.title}
                                        percentage={inputSet.percentage}
                                        onInputChange={handleSkillsInputChange}
                                        onRemoveClick={handleRemoveSkillsInputSet}
                                        number={index + 1}
                                    />
                                ))}
                            </div>
                        </div>

                    </form>
                    {loading && <Loader />}
                </section>
                <section className='m-auto flex w-full  p-3'>
                    <Resume education={education} experience={experience} skills={skills} activeNav={"Resume"} isPreview={true} />
                </section>
                {/* <article className={`resume active `} data-page="resume">

                </article> */}
            </div>
        </article>
    )
}

export default ResumeForm