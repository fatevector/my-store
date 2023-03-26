import { useState } from "react";

const Counter = ({ onUpdate, initValue = 1 }) => {
    const [count, setCount] = useState(initValue);

    const handleIncrement = () => {
        setCount(prevState => {
            onUpdate(prevState + 1);
            return prevState + 1;
        });
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(prevState => {
                onUpdate(prevState - 1);
                return prevState - 1;
            });
        }
    };

    return (
        <div className="mb-4">
            <i
                className="bi bi-caret-left-fill border border-secondary rounded p-2 me-2"
                onClick={handleDecrement}
            ></i>
            <span className="text-body">{count}</span>
            <i
                className="bi bi-caret-right-fill border border-secondary rounded p-2 ms-2"
                onClick={handleIncrement}
            ></i>
        </div>
    );
};

export default Counter;
