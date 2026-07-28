import { useEffect, useState } from "react";
import api from "../../api/axios";
import StatusBadge from "../../components/StatusBadge";
import ActionButton from "../../components/ActionButton";
import Loader from "../../components/Loader";

function PendingBookings() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchRequests = async () => {
        try {

            const response = await api.get("/bookings/pending");

            setRequests(response.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const approve = async (id) => {

        try {

            await api.put(`/bookings/${id}/approve`);

            fetchRequests();

        } catch (error) {

            alert(error.response?.data?.message || "Approval Failed");

        }

    };

    const reject = async (id) => {

        try {

            await api.put(`/bookings/${id}/reject`);

            fetchRequests();

        } catch (error) {

            alert(error.response?.data?.message || "Reject Failed");

        }

    };

    if (loading) {
    return <Loader />;
    }
    const filteredRequests = requests.filter((request) =>
    request.studentName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    return (

        <div>

            <h2 className="mb-4">
                Pending Booking Requests
            </h2>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search Student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="table-responsive">

                <table className="table table-striped table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Student</th>
                            <th>Register No</th>
                            <th>Department</th>
                            <th>Block</th>
                            <th>Room</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                        filteredRequests.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center"
                                >
                                    No Pending Requests
                                </td>

                            </tr>

                        )

                        :

                        filteredRequests.map((request) => (

                            <tr key={request.requestId}>

                                <td>{request.requestId}</td>

                                <td>{request.studentName}</td>

                                <td>{request.registerNo}</td>

                                <td>{request.department}</td>

                                <td>{request.blockName}</td>

                                <td>{request.roomNumber}</td>

                                <td>
                                    <StatusBadge
                                        status={request.requestStatus}
                                    />
                                </td>

                                <td>

                                    <ActionButton
                                        text="Approve"
                                        icon="bi bi-check-circle"
                                        color="success"
                                        onClick={() => approve(request.requestId)}
                                    />

                                    <ActionButton
                                        text="Reject"
                                        icon="bi bi-x-circle"
                                        color="danger"
                                        onClick={() => reject(request.requestId)}
                                    />

                                </td>

                            </tr>

                        ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

        );
}

export default PendingBookings;