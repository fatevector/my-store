import { useSelector } from "react-redux";

import { getCurrentUserData } from "../../store/auth";

import Loader from "../common/loader";
import UserPage from "../pages/userPage";

const User = () => {
    const currentUserData = useSelector(getCurrentUserData());

    if (!currentUserData) return <Loader className="mt-300" />;
    return <UserPage user={currentUserData} />;
};

export default User;
