import React from "react";

const SelectField = ({
    label,
    name,
    value,
    onChange,
    defaultOption = "Выберите вариант...",
    options,
    error
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    const getSelectClasses = () => "form-select" + (error ? " is-invalid" : "");

    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
            )}
            <select
                className={getSelectClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.length > 0 &&
                    optionsArray.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default SelectField;
