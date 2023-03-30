import React from 'react'

import Markup from '../common/markup'

function ExperienceInputSet({ id, company, priority, from, to, description, role, onInputChange, onRemoveClick, number }) {
    return (
        <div className='flex mb-4 flex-col text-white '>

            <div className="">
                <label htmlFor={`company_${id}`} className='block mb-1 flex'>
                    <p className='mr-2 text-xl'>{number}.</p>  Company
                </label>
                <input
                    type="text"
                    id={`company_${id}`}
                    name={`company_${id}`}
                    value={company}
                    onChange={(e) => onInputChange(id, "company", e.target.value)}
                    className="border border-gray-300 rounded w-full p-2"
                />
            </div>
            <div className='flex gap-2'>
                <div className="mt-2">
                    <label htmlFor={`description_${id}`} className="block mb-1">
                        From
                    </label>
                    <input
                        id={`from_${id}`}
                        name={`from_${id}`}
                        type="number"
                        value={from}
                        onChange={(e) => onInputChange(id, "from", e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor={`description_${id}`} className="block mb-1">
                        To
                    </label>
                    <input
                        id={`to_${id}`}
                        name={`to_${id}`}
                        type="number"
                        value={to}
                        onChange={(e) => onInputChange(id, "to", e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                </div>
            </div>
            <div className='flex'>
                <div className="mt-2">
                    <label htmlFor={`description_${id}`} className="block mb-1">
                        Role
                    </label>
                    <input
                        id={`role_${id}`}
                        name={`role_${id}`}
                        type="text"
                        value={role}
                        onChange={(e) => onInputChange(id, "role", e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                </div>
            </div>
            <div className="mt-2 break-all">
                <label htmlFor={`description_${id}`} className="block mb-1">
                    Description
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
                    setData={(data) => onInputChange(id, "description", data)}
                    className="border border-gray-300 rounded p-10"
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

export default ExperienceInputSet