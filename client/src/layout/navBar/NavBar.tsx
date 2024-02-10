import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavBar({ setIsLoggedIn }: Props) {
  const { user } = useContext(UserContext);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
  }

  return (
    <nav className=" bg-blue-900 min-w-[200px] md:min-w-[250px] md:max-w-[300px] max-w-[250px] text-white min-h-screen flex flex-col">
      <h2 className=" p-2 text-lg font-semibold bg-blue-950 capitalize">
        {user?.role} Actions
      </h2>

      <div className="border-y  p-2">
        <Link to={`/`}>My account</Link>
      </div>

      {user?.role === "admin" && (
        <>
          <div className="border-y  p-2">
            <Link to={`/dashboard`}>Dashboard</Link>
          </div>

          <div className="border-y  p-2">
            <Link to={`/add-department`}>Add Department</Link>
          </div>

          <div className="border-y  p-2">
            <Link to={`/add-job`}>Add Job</Link>
          </div>

          <div className="border-y  p-2">
            <Link to={`/create-account`}>Create user account</Link>
          </div>
        </>
      )}

      {user?.role === "manager" && (
        <>
          <div className="border-y  p-2">
            <Link to={`/submitted-claims`}>Submitted Claims</Link>
          </div>

          <div className="border-y  p-2">
            <Link to={`/reviewed-claims`}>Reviewed Claims</Link>
          </div>
        </>
      )}

      {user?.role === "claimant" && (
        <>
          <div className="border-y  p-2">
            <Link to={`/submit-claim`}>Submit Claim</Link>
          </div>

          <div className="border-y  p-2">
            <Link to={`/my-claims`}>My Claims</Link>
          </div>
        </>
      )}

      <button
        className="border-y w-full bg-blue-950 p-2 mt-auto sticky bottom-0 "
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
