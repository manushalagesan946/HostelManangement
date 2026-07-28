import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import StatusBadge from "../../components/StatusBadge";

function Bookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchBookings = async () => {

        try {

            const response = await api.get("/bookings");

            setBookings(response.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchBookings();

    }, []);

    if (loading) {

        return <Loader />;

    }

    const filteredBookings = bookings.filter((booking) =>

        booking.NAME.toLowerCase().includes(search.toLowerCase()) ||

        booking.REGISTER_NO.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div>

            <h2 className="mb-4">
                All Bookings
            </h2>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Name or Register No"
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
                            <th>Block</th>
                            <th>Room</th>
                            <th>Fee</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredBookings.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="text-center"
                                    >
                                        No Bookings Found
                                    </td>

                                </tr>

                            )

                            :

                            filteredBookings.map((booking) => (

                                <tr key={booking.REQUEST_ID}>

                                    <td>{booking.REQUEST_ID}</td>

                                    <td>{booking.NAME}</td>

                                    <td>{booking.REGISTER_NO}</td>

                                    <td>{booking.BLOCK_NAME}</td>

                                    <td>{booking.ROOM_NUMBER}</td>

                                    <td>₹{booking.FEE}</td>

                                    <td>

                                        <StatusBadge
                                            status={booking.PAYMENT_STATUS}
                                        />

                                    </td>

                                    <td>

                                        <StatusBadge
                                            status={booking.REQUEST_STATUS}
                                        />

                                    </td>

                                    <td>

                                        {new Date(booking.REQUEST_DATE)
                                            .toLocaleDateString()}

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

export default Bookings;