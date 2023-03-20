const Loader = ({ className }) => {
    return (
        <div className={"loader-wrap " + className}>
            <span className="loader"></span>
        </div>
    );
};

export default Loader;
