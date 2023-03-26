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
            className={
                "bg-body text-body p-1 border border-secondary " + className
            }
        />
    );
};

export default SearchField;
