import React from "react";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const getCheckBoxClasses = () =>
        "form-check-input" +
        (value ? "" : " bg-body") +
        (error ? " is-invalid" : "");

    const handleChange = () => {
        onChange({ name, value: !value });
    };

    return (
        <div className="form-check mb-4">
            <input
                className={getCheckBoxClasses()}
                type="checkbox"
                value=""
                id={name}
                checked={value}
                onChange={handleChange}
            />
            <label
                className="form-check-label text-body bg-body"
                htmlFor={name}
            >
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default CheckBoxField;
