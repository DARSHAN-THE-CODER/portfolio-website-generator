import React, { useState } from 'react'

import TagsInput from './TagsInput'
import Markup from '../common/markup';

function ProjectsInput({ id, name, description, github, category, date, thumbnail, liveLink, techUsed, onInputChange, onRemoveClick, number }) {

    const [tags, setTags] = useState(techUsed || [])
    const handleTagsChange = (newTags) => {
        console.log('New tags:', newTags);
        // techUsed = newTags;
        onInputChange(id, "techUsed", newTags)
    };

    return (
        <div className='flex mb-4 flex-col '>
            <div className="">
                <label htmlFor={`name_${id}`} className="mb-1 flex xd">
                    <p className="mr-2 text-xl xd">{number}.</p>  Name of the project
                </label>
                <input
                    type="text"
                    id={`name_${id}`}
                    name={`name_${id}`}
                    value={name}
                    onChange={(e) => onInputChange(id, "name", e.target.value)}
                    className="border border-gray-300 rounded w-full p-2"
                />
            </div>
            <div className="mt-2">
                <label htmlFor={`description_${id}`} className="flex mb-1">
                    <p className="mr-2 text-xl">Description</p>
                </label>
                {/* <textarea
                    id={`description_${id}`}
                    name={`description_${id}`}
                    value={description}
                    onChange={(e) => onInputChange(id, "description", e.target.value)}
                    className="border border-gray-300 rounded w-full p-2"
                    rows={3}
                /> */}
                <Markup
                    // id={`description_${id}`}
                    // name={`description_${id}`}
                    data={description}
                    setData={(e) => onInputChange(id, "description", e)}
                />
            </div>
            <div className=''>
                <div className="mt-2">
                    <label htmlFor={`category_${id}`} className="flex mb-1">
                        <p className="mr-2 text-xl">Category</p>
                    </label>
                    <input
                        id={`category_${id}`}
                        name={`category_${id}`}
                        type="text"
                        value={category}
                        onChange={(e) => onInputChange(id, "category", e.target.value)}
                        className="border border-gray-300 w-full rounded p-2"
                    />
                </div>
            </div>
            <div className=''>
                <div className="mt-2">
                    <label htmlFor={`github_${id}`} className="block mb-1">
                        Github Link
                    </label>
                    <input
                        id={`github_${id}`}
                        name={`github_${id}`}
                        type="text"
                        value={github}
                        onChange={(e) => onInputChange(id, "github", e.target.value)}
                        className="border border-gray-300 w-full rounded p-2"
                    />
                </div>
            </div>
            <div className=''>
                <div className="mt-2">
                    <label htmlFor={`github_${id}`} className="block mb-1">
                        Live website Link
                    </label>
                    <input
                        id={`liveLink_${id}`}
                        name={`liveLink_${id}`}
                        type="text"
                        value={liveLink}
                        onChange={(e) => onInputChange(id, "liveLink", e.target.value)}
                        className="border border-gray-300 w-full rounded p-2"
                    />
                </div>
            </div>
            <div className=''>
                <div className="mt-2">
                    <label htmlFor={`github_${id}`} className="block mb-1">
                        Thumbnail url
                    </label>
                    <input
                        id={`thumbnail_${id}`}
                        name={`thumbnail_${id}`}
                        type="text"
                        value={thumbnail}
                        onChange={(e) => onInputChange(id, "thumbnail", e.target.value)}
                        className="border border-gray-300 w-full rounded p-2"
                    />
                </div>
            </div>
            <div className=''>
                <div className="mt-2">
                    <label htmlFor={`github_${id}`} className="block mb-1">
                        Date of completion
                    </label>
                    <input
                        id={`date_${id}`}
                        name={`date_${id}`}
                        type="text"
                        value={date}
                        onChange={(e) => onInputChange(id, "date", e.target.value)}
                        className="border border-gray-300 w-full rounded p-2"
                    />
                </div>
            </div>
            <div className=''>
                <div className="mt-2">
                    <label htmlFor={`github_${id}`} className="block mb-1">
                        Tech used
                    </label>
                    <TagsInput onChange={handleTagsChange} tags={tags} setTags={setTags} />
                </div>
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
    )
}

export default ProjectsInput