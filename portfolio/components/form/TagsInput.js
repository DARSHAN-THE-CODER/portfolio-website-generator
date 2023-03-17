import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';

const TagInput = ({ className, onChange, tags, setTags }) => {
  // const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      setInputValue('');
      onChange(newTags); // Call the onChange callback with the updated tags array
    } else if (event.key === 'Backspace' && !inputValue) {
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      onChange(newTags); // Call the onChange callback with the updated tags array
    }
  };

  const handleTagClick = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange(newTags); // Call the onChange callback with the updated tags array
  };

  // const tagClassNames = classNames(
  //   'inline-block',
  //   'rounded',
  //   'px-2',
  //   'py-1',
  //   'bg-gray-200',
  //   'text-gray-700',
  //   'mr-2',
  //   'mb-2',
  // );

  return (
    <div className="flex, flex-wrap">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="border border-gray-300 rounded p-2 mb-2"
        placeholder="Add tags..."
      />
      {tags?.map((tag) => (
        <div
          key={tag}
          className="inline-block rounded px-2 py-1 bg-gray-200 text-gray-700 mr-2 mb-2 cursor-pointer"
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default TagInput;
