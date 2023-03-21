import React from "react";

const SearchField = ({
    value = "",
    onChange,
    placeholder = "Поиск...",
    name,
    className
}) => {
    return (
        <input
            name={name}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={"bg-body " + className}
        />
    );
};

export default SearchField;
