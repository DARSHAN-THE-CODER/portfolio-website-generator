import { useState, useEffect } from "react"
import axios from "axios";
import { APIURL } from "@/utils/api.utils";
import { toast } from "react-toastify"

const InputSet = ({ id, title, description, onInputChange, onRemoveClick, nnn }) => {
    return (
        <div className="flex mb-4 flex-col text-white ">

            <div className="">
                <label htmlFor={`title_${id}`} className="block mb-1 flex">
                    <p className="mr-2 text-xl">{nnn}.</p>  Title
                </label>
                <input
                    type="text"
                    id={`title_${id}`}
                    name={`title_${id}`}
                    value={title}
                    onChange={(e) => onInputChange(id, "title", e.target.value)}
                    className="border border-gray-300 rounded w-full p-2"
                />
            </div>
            <div className="mt-2">
                <label htmlFor={`description_${id}`} className="block mb-1">
                    Description
                </label>
                <textarea
                    id={`description_${id}`}
                    name={`description_${id}`}
                    value={description}
                    onChange={(e) => onInputChange(id, "description", e.target.value)}
                    className="border border-gray-300 rounded w-full p-2"
                    rows={3}
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => onRemoveClick(id)}
                    className="ml-2 mt-7 px-2 py-1 w-10 text-center bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    -
                </button>
            </div>
            <hr className="mt-3"></hr>
        </div>
    );
};


function AboutForm({ activeNav }) {
    const [about, setAbout] = useState({})
    const [aboutCards, setAboutCards] = useState([{ id: 0, title: "", description: "" }]);

    const [idCounter, setIdCounter] = useState(1)
    const [username, setUsername] = useState("")

    useEffect(() => {
        let location = window.location.hostname;
        let check = location.split(".");
        console.log(check)
        if (check[0] !== "localhost") {
            axios.get(`${APIURL}/user/username/${check[0]}`)
                .then((res) => {
                    // console.log(res)
                    if (res.status === 200) {
                        setUsername(check[0])
                        axios.get(`${APIURL}/user/${check[0]}`)
                            .then((res) => {
                                console.log(res.data)
                                const { socialLinks, projects, education, experience, skills, contactResponses, updatedAt, id, ...imp } = res.data;
                                console.log(imp)
                                setAboutCards(imp.aboutCards)

                                setIdCounter((imp.aboutCards[imp.aboutCards.length - 1]?.id + 1) || 1)
                                delete imp.aboutCards;
                                setAbout(imp)
                            }
                            )
                    }
                    else {
                        return toast.error(`No user found with username ${check[0]}`)
                        // router.push('https://www.mytechfolio.tech');
                        // router.push('http://www.mytechfolio.tech');
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])


    const handleInputChange = (id, field, value) => {
        setAboutCards((prevState) =>
            prevState.map((inputSet) =>
                inputSet.id === id ? { ...inputSet, [field]: value } : inputSet
            )
        );
    };

    const handleAddInputSet = () => {
        setAboutCards((prevState) => [
            ...prevState,
            { id: idCounter, title: "", description: "" },
        ]);
        setIdCounter((prevState) => prevState + 1);
    };

    const handleRemoveInputSet = (id) => {
        if (aboutCards.length === 1) return
        setAboutCards((prevState) => prevState.filter((inputSet) => inputSet.id !== id));
    };


    function handleSubmit(e) {
        e.preventDefault()
        let temp = about;
        temp['aboutCards'] = aboutCards;
        console.log(temp)
    }

    console.log(aboutCards);

    function handleSaveAboutCards() {
        console.log(aboutCards)
        let temp = aboutCards;

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
            return toast.error("Please fill all the fields")
        } else{
            axios.post(`${APIURL}/user/about-cards/${username}`, { data: aboutCards })
                .then((res) => {
                    console.log(res)
                    toast.success("About cards saved successfully")
                }
                )
                .catch((err) => {
                    console.log(err)
                    toast.error("Error saving about cards")
                }
                )
        }
    }

    function handleSaveBasic() {
        console.log(about)
        axios.patch(`${APIURL}/user/${username}`, { data: about })
            .then((res) => {
                console.log(res)
                toast.success("Basic details saved successfully")
            }
            )
            .catch((err) => {
                console.log(err)
                toast.error("Error saving basic details")
            }
            )
    }
    return (
        <article className={`about ${activeNav === "AboutForm" ? "active" : ""}`} data-page="about">
            <header>
                <h2 className="h2 article-title">Enter basic details</h2>
            </header>

            <div className="flex flex-col md:flex-row">

                <section className="m-auto flex w-full md:w-[50vw] p-3">
                    <form className="form" onSubmit={handleSubmit} target="_blank">

                        <button
                            type='button'
                            onClick={() => handleSaveBasic()}
                            className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Save Basic details
                        </button>
                        <div className="flex md:flex-row w-full flex-col justify-around gap-3 mt-4 text-center">
                            <div className="form-group text-white ">
                                <p>email</p>
                                <input required type="email" className="border-2 rounded-2xl p-2 m-2" name="email" id="email" placeholder="email id"
                                    onChange={(e) => setAbout({ ...about, email: e.target.value })}
                                    value={about.email}
                                />
                            </div>

                            <div className="form-group text-white">
                                <p>Name</p>
                                <input required type="text" className="border-2 rounded-2xl p-2 m-2" name="name" id="name" placeholder="Your name "
                                    onChange={(e) => setAbout({ ...about, name: e.target.value })}
                                    value={about.name}
                                />
                            </div>

                            <div className="flex justify-around text-white gap-4 align-middle">
                                <div className="flex items-center">
                                    <label className="flex font-bold mr-4" htmlFor="gender">
                                        Gender{" "}
                                    </label>
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={about?.gender === "male"}
                                        onChange={(e) => setAbout((prev) => ({ ...prev, gender: e.target.value }))}
                                        className="mr-2"
                                    />
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        checked={about?.gender === "female"}
                                        onChange={(e) => setAbout((prev) => ({ ...prev, gender: e.target.value }))}
                                        className="mr-2"
                                    />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>

                        <div className="flex md:flex-row flex-col justify-around gap-3 mt-4 text-center">
                            <div className="form-group text-white">
                                <p>Location</p>
                                <input required type="text" className="border-2 rounded-2xl p-2 m-2" name="phone" id="phone" placeholder="Address"
                                    onChange={(e) => setAbout({ ...about, address: e.target.value })}
                                    value={about.address}
                                />
                            </div>
                            <div className="form-group text-white">
                                <p>Describe yourself in max 3 - 4 words </p>
                                <input required type="text" className="border-2 rounded-2xl p-2 m-2" name="phone" id="phone" placeholder="I am..."
                                    onChange={(e) => setAbout({ ...about, shortDesc: e.target.value })}
                                    value={about.shortDesc}
                                />
                            </div>
                        </div>

                        <div className="flex md:flex-row flex-col justify-around gap-3  text-center mt-4">
                            <div className="form-group text-white">
                                <p>Phone number</p>
                                <input required type="text" className="border-2 rounded-2xl p-2 m-2" name="phone" id="phone" placeholder="Enter your mobile number"
                                    onChange={(e) => setAbout({ ...about, phone: e.target.value })}
                                    value={about.phone}
                                />
                            </div>
                            <div className="form-group text-white">
                                <p>Date of birth</p>
                                <input required type="text" className="border-2 rounded-2xl p-2 m-2" name="phone" id="phone" placeholder="DOB"
                                    onChange={(e) => setAbout({ ...about, dob: e.target.value })}
                                    value={about.dob}
                                />
                            </div>


                        </div>


                        <div className="form-group text-white mt-4">
                            <p>Tell about yourself in more detailed manner</p>
                            <textarea required type="text" className="border-2 rounded-2xl p-2 m-2" name="phone" id="phone" placeholder="I am..."
                                onChange={(e) => setAbout({ ...about, about: e.target.value })}
                                value={about.about}
                            />
                        </div>

                        <div className="flex justify-evenly gap-3 mt-5 flex-col text-white">
                            <div className="form-group text-white">
                                <p className="bold">Please provide the URL of your photo</p>
                                <p className="flex text-white italic">use {" "} <a href="https://imgbb.com/" target="_blank" className="ml-2 mr-2 underline hover:text-blue-500">imgbb</a> to generate link <br></br> </p>
                                <p className="flex text-white italic">Set Don't autodelete and copy image address by right clicking on the image once you paste the link in browser</p>

                            </div>
                            <div className="flex ">
                                <input required type="url" className="border-2 rounded-2xl p-2 m-2" name="phone" id="phone" placeholder="URL"
                                    onChange={(e) => setAbout({ ...about, photoURL: e.target.value })}
                                    value={about.photoURL}
                                />
                                {/* {
                                about.photoURL && <img src={about.photoURL} alt="URL might be incorrect" className="w-20 h-20 m-auto mt-4 text-white" />
                            } */}
                            </div>
                        </div>
                        <p className="h2 article-title mt-10">Information about your tech interests </p>

                        <div>
                            <div className="w-full m-auto rounded-xl flex items-center justify-between p-4">
                                <p className="text-white">Example  </p>
                                <ul className=" w-full">
                                    <li className="service-item w-full">
                                        <div className="service-content-box">
                                            <h4 className="h4 service-item-title">Web Design</h4>

                                            <p className="service-item-text">
                                                The most modern and high-quality design made at a professional level
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col md:flex-row md:gap-6">
                                <button
                                    type="button"
                                    onClick={handleAddInputSet}
                                    className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                >
                                    Add +
                                </button>
                                <button
                                    type='button'
                                    onClick={() => handleSaveAboutCards()}
                                    className="mb-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                >
                                    Save details
                                </button>
                            </div>
                            {aboutCards?.map((inputSet, index) => (
                                <InputSet
                                    className="bg-gray-300"
                                    key={inputSet.id}
                                    id={inputSet.id}
                                    title={inputSet.title}
                                    description={inputSet.description}
                                    onInputChange={handleInputChange}
                                    onRemoveClick={handleRemoveInputSet}
                                    nnn={index + 1}
                                />
                            ))}

                        </div>
                        {/* <div className="form-group mt-4" >
                            <button className="form-btn m-auto" type="submit" >
                                Save Details
                            </button>
                        </div> */}
                    </form>
                </section>

                <article className={`about active w-full md:w-[50vw] p-3`} data-page="about">
                    <header>
                        <h2 className="h2 article-title">About me (preview)</h2>
                    </header>
                    <figure className="w-full m-auto flex justify-center mb-10">
                        <img src={about?.photoURL} alt='URL might be incorrect' className="text-white" style={{ height: "300px", borderRadius: "30px" }} loading="lazy" />
                    </figure>
                    <section className="about-text flex-wrap break-all">
                        {about?.about}
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
            </div>
        </article>
    )
}

export default AboutForm