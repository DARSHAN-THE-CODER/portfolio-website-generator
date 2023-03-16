import React from 'react'

function SkillsInput({ id, skill, title, percentage, onInputChange, onRemoveClick, number}) {
  return (
    <div className="flex mb-4 flex-col text-white ">
        <div className="">
            <label htmlFor={`skill_${id}`} className="block mb-1 flex">
                <p className="mr-2 text-xl">{number}.</p>  Skill
            </label>
            <input
                type="text"
                id={`skill_${id}`}
                name={`skill_${id}`}
                value={title}
                onChange={(e) => onInputChange(id, "title", e.target.value)}
                className="border border-gray-300 rounded w-full p-2"
            />
        </div>
        <div className="mt-2">
            <label htmlFor={`percentage_${id}`} className="block mb-1">
                Percentage of proficiency
            </label>
            <input
                id={`percentage_${id}`}
                name={`percentage_${id}`}
                type="number"
                value={percentage}
                min="0"
                onChange={(e) => onInputChange(id, "percentage", Number(e.target.value))}
                className="border border-gray-300 rounded p-2"
            />
        </div>
        <div className="mt-2">
            <button
                type="button"
                className="ml-2 mt-7 px-2 py-1 w-10 text-center bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => onRemoveClick(id)}
            >
                -
            </button>
        </div>
    </div>
  )
}

export default SkillsInput