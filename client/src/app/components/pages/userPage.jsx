import UserCard from "../ui/userCard";

const UserPage = ({ user }) => {
    return (
        <div className="container">
            <h1 className="ms-3">Профиль</h1>
            <UserCard user={user} />
        </div>
    );
};

export default UserPage;
