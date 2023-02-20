import React from "react";

const SearchField = ({
    value = "",
    onChange,
    placeholder = "Поиск...",
    name
}) => {
    return (
        <input
            name={name}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default SearchField;
