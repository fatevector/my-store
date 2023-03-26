import React from "react";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
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
