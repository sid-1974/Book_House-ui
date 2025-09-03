import AdminProfile from "../components/admin/AdminProfile";
import UserProfile from "../components/public/Profile/UserProfile";
import useAuth from "../hook/UseAuth";

const Profile = () => {
    const { userRole } = useAuth();
  return (
    <div>
      {userRole === "admin" ? <AdminProfile /> : <UserProfile />}
    </div>
  )
}

export default Profile
