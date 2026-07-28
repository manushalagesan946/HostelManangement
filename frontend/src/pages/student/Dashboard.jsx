import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import StatusBadge from "../../components/StatusBadge";

function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {

            const [profileRes, bookingRes] = await Promise.all([
                api.get("/students/profile"),
                api.get("/bookings/my")
            ]);

            setProfile(profileRes.data.data);

            if (bookingRes.data.data.length > 0) {
                setBooking(bookingRes.data.data[0]);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (

        <div className="container-fluid">

            <div className="mb-4">

                <h2 className="fw-bold">
                    Welcome, {profile.NAME} 👋
                </h2>

                <p className="text-muted">
                    {profile.DEPARTMENT} • Year {profile.YEAR}
                </p>

            </div>

            <div className="row g-4">

                <div className="col-md-4">

                    <div className="card shadow border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-3">
                                <i className="bi bi-person-badge me-2"></i>
                                Student Details
                            </h5>

                            <p><strong>Register No</strong></p>
                            <h4>{profile.REGISTER_NO}</h4>

                            <hr />

                            <p className="mb-1">
                                <strong>Email</strong>
                            </p>

                            <p>{profile.EMAIL}</p>

                            <p className="mb-1">
                                <strong>Phone</strong>
                            </p>

                            <p>{profile.PHONE}</p>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-3">
                                <i className="bi bi-house-door me-2"></i>
                                Room Details
                            </h5>

                            {

                                booking ?

                                <>

                                    <p className="mb-1">
                                        <strong>Block</strong>
                                    </p>

                                    <h4>{booking.BLOCK_NAME}</h4>

                                    <p className="mb-1 mt-3">
                                        <strong>Room</strong>
                                    </p>

                                    <h4>{booking.ROOM_NUMBER}</h4>

                                    <p className="mb-1 mt-3">
                                        <strong>Fee</strong>
                                    </p>

                                    <h4>₹{booking.FEE}</h4>

                                </>

                                :

                                <div className="alert alert-warning">
                                    No Room Allocated
                                </div>

                            }

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-3">
                                <i className="bi bi-credit-card me-2"></i>
                                Status
                            </h5>

                            {

                                booking ?

                                <>

                                    <p className="mb-2">
                                        <strong>Payment Status</strong>
                                    </p>

                                    <StatusBadge
                                        status={booking.PAYMENT_STATUS}
                                    />

                                    <br /><br />

                                    <p className="mb-2">
                                        <strong>Booking Status</strong>
                                    </p>

                                    <StatusBadge
                                        status={booking.REQUEST_STATUS}
                                    />

                                    <hr />

                                    <p>

                                        <strong>Request Date</strong>

                                    </p>

                                    {new Date(
                                        booking.REQUEST_DATE
                                    ).toLocaleDateString()}

                                </>

                                :

                                <div className="alert alert-warning">
                                    No Booking Request
                                </div>

                            }

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow border-0 mt-4">

                <div className="card-header bg-primary text-white">

                    <h5 className="mb-0">

                        Student Information

                    </h5>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <table className="table">

                                <tbody>

                                    <tr>

                                        <th>Name</th>

                                        <td>{profile.NAME}</td>

                                    </tr>

                                    <tr>

                                        <th>Department</th>

                                        <td>{profile.DEPARTMENT}</td>

                                    </tr>

                                    <tr>

                                        <th>Year</th>

                                        <td>{profile.YEAR}</td>

                                    </tr>

                                    <tr>

                                        <th>Gender</th>

                                        <td>{profile.GENDER}</td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        <div className="col-md-6">

                            <table className="table">

                                <tbody>

                                    <tr>

                                        <th>Parent</th>

                                        <td>{profile.PARENT_NAME}</td>

                                    </tr>

                                    <tr>

                                        <th>Parent Phone</th>

                                        <td>{profile.PARENT_PHONE}</td>

                                    </tr>

                                    <tr>

                                        <th>Address</th>

                                        <td>{profile.ADDRESS}</td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;