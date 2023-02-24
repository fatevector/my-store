import { useSelector } from "react-redux";

import { getCurrentUserData } from "../../store/auth";

import UserPage from "../pages/userPage";

const User = () => {
    const currentUserData = useSelector(getCurrentUserData());

    if (!currentUserData) return "Loading...";
    return <UserPage user={currentUserData} />;
};

export default User;
