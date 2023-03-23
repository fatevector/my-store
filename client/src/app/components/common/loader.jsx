const Loader = ({ className, innerClass }) => {
    return (
        <div className={"loader-wrap " + className}>
            <span className={"loader " + innerClass}></span>
        </div>
    );
};

export default Loader;
