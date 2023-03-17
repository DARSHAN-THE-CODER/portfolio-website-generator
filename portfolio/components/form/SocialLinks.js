import React from 'react'

function SocialLinksInput({ id, linkName, url, onInputChange, onRemoveClick, number }) {

    return (
        <div className='flex mb-4 flex-col text-white '>
            <div className="">
                <label htmlFor={`url_${id}`} className="mb-1 flex">
                    <p className="mr-2 text-xl xd m-auto ml-0">{number}. Link Name</p>
                    <a href={url} target="_blank" className="icon-box">
                        <ion-icon className='mt-4 hover:text-white' name={`logo-${linkName}`}></ion-icon>
                    </a>
                </label>
                <input
                    type="text"
                    id={`institution_${id}`}
                    name={`institution_${id}`}
                    value={linkName}
                    onChange={(e) => onInputChange(id, "linkName", e.target.value)}
                    className="border border-gray-300 rounded w-full p-2"
                />
            </div>
            <div className="">
                <label htmlFor={`url_${id}`} className="mb-1 flex">
                    <p className="mr-2 text-xl">URL</p>
                </label>
                <input
                    type="text"
                    id={`url_${id}`}
                    name={`url_${id}`}
                    value={url}
                    onChange={(e) => onInputChange(id, "url", e.target.value)}
                    className="border border-gray-300 rounded w-full p-2"
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
    )
}

export default SocialLinksInput