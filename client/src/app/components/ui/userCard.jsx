import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                {/* <Link to="/profile/edit">
                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                        <i className="bi bi-gear"></i>
                    </button>{" "}
                </Link> */}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
                        className="rounded-circle"
                        alt="avatar"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;
