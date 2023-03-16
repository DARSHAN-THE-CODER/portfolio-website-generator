import React from 'react'

const EducationInputSet = ({ id, institution, priority, from, to, description, percentage, onInputChange, onRemoveClick, number }) => {
    return (
        <div className="flex mb-4 flex-col text-white ">

            <div className="">
                <label htmlFor={`title_${id}`} className="block mb-1 flex">
                    <p className="mr-2 text-xl">{number}.</p>  Institution
                </label>
                <input
                    type="text"
                    id={`institution_${id}`}
                    name={`institution_${id}`}
                    value={institution}
                    onChange={(e) => onInputChange(id, "institution", e.target.value)}
                    className="border border-gray-300 rounded w-full p-2"
                />
            </div>
            <div className='flex gap-2'>
                <div className="mt-2">
                    <label htmlFor={`from_${id}`} className="block mb-1">
                        From
                    </label>
                    <input
                        id={`from_${id}`}
                        name={`from_${id}`}
                        type="text"
                        value={from}
                        onChange={(e) => onInputChange(id, "from",(e.target.value))}
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
                        type="text"
                        value={to}
                        onChange={(e) => onInputChange(id, "to", (e.target.value))}
                        className="border border-gray-300 rounded p-2"
                    />
                </div>
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
            <div className="mt-2">
                <label htmlFor={`description_${id}`} className="block mb-1">
                    Percentage / gpa
                </label>
                <input
                    id={`percentage_${id}`}
                    name={`percentage_${id}`}
                    value={percentage}
                    onChange={(e) => onInputChange(id, "percentage", e.target.value)}
                    className="border border-gray-300 rounded w-full p-2"
                    type="text"
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



export default EducationInputSet