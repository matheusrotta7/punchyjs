import React from 'react';

const Dropdown = ({ options, selectedOption, handleChange }) => {
    return (
        <div>
            <select value={selectedOption} onChange={handleChange} className="text-zinc-800 w-48 bg-white">
                {options.map((option) => (
                    <option className="text-zinc-800" key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default Dropdown;