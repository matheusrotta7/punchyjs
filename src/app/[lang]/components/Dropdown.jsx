import React from 'react';

const Dropdown = ({ options, selectedOption, setSelectedOption }) => {

    const onDropdownChange = (event) => {
        setSelectedOption(options.find((option) => option.name === event.target.value));
    };

    return (
        <div>
            <select value={selectedOption.name} onChange={onDropdownChange} className="text-zinc-800 w-48 bg-white">
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