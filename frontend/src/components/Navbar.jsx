import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();
        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg bg-white shadow-sm">

            <div className="container-fluid">

                <h4 className="mb-0">

                    Welcome,
                    {" "}
                    <span className="text-primary">
                        {user.name}
                    </span>

                </h4>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>

                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;