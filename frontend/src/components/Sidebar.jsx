import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

    const { user } = useAuth();

    const linkStyle = ({ isActive }) =>
        `nav-link text-white rounded px-3 py-2 mb-2 ${
            isActive ? "bg-primary" : ""
        }`;

    return (

        <div
            className="bg-dark text-white d-flex flex-column p-3"
            style={{
                width: "260px",
                minHeight: "100vh"
            }}
        >

            <h3 className="text-center mb-4">
                🏠 HostelMS
            </h3>

            {
                user.role === "ADMIN" && (
                    <>

                        <NavLink
                            to="/admin/dashboard"
                            className={linkStyle}
                        >
                            <i className="bi bi-speedometer2 me-2"></i>
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/admin/students"
                            className={linkStyle}
                        >
                            <i className="bi bi-people me-2"></i>
                            Students
                        </NavLink>

                        <NavLink
                            to="/admin/bookings"
                            className={linkStyle}
                        >
                            <i className="bi bi-journal-check me-2"></i>
                            Bookings
                        </NavLink>

                        <NavLink
                            to="/admin/pending"
                            className={linkStyle}
                        >
                            <i className="bi bi-hourglass-split me-2"></i>
                            Pending Requests
                        </NavLink>

                        <NavLink
                            to="/admin/payments"
                            className={linkStyle}
                        >
                            <i className="bi bi-cash-stack me-2"></i>
                            Payments
                        </NavLink>

                    </>
                )
            }

            {
                user.role === "STUDENT" && (
                    <>

                        <NavLink
                            to="/student/dashboard"
                            className={linkStyle}
                        >
                            <i className="bi bi-speedometer2 me-2"></i>
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/student/rooms"
                            className={linkStyle}
                        >
                            <i className="bi bi-house-door me-2"></i>
                            Rooms
                        </NavLink>

                        <NavLink
                            to="/student/bookings"
                            className={linkStyle}
                        >
                            <i className="bi bi-journal-text me-2"></i>
                            My Bookings
                        </NavLink>

                        <NavLink
                            to="/student/profile"
                            className={linkStyle}
                        >
                            <i className="bi bi-person-circle me-2"></i>
                            Profile
                        </NavLink>

                    </>
                )
            }

        </div>

    );
}

export default Sidebar;