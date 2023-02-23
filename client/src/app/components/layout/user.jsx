import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import UserPage from "../pages/userPage";
import { getCurrentUserData } from "../../store/auth";

const User = () => {
    const currentUserData = useSelector(getCurrentUserData());

    if (!currentUserData) return <Redirect to="/login" />;
    return <UserPage user={currentUserData} />;
};

export default User;
