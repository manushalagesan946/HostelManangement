import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchRooms = async () => {

        try {

            const response = await api.get("/rooms");

            setRooms(response.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchRooms();

    }, []);

    if (loading) {

        return <Loader />;

    }

    const filteredRooms = rooms.filter(room =>
        room.ROOM_NUMBER.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div>

            <h2 className="mb-4">
                Available Rooms
            </h2>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search Room..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="row">

                {

                    filteredRooms.map(room => {

                        const available =
                            room.CAPACITY - room.OCCUPIED_COUNT;

                        return (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={room.ROOM_ID}
                            >

                                <div className="card shadow border-0 h-100">

                                    <div className="card-body">

                                        <h4 className="fw-bold">

                                            {room.ROOM_NUMBER}

                                        </h4>

                                        <hr />

                                        <p>

                                            <strong>Capacity :</strong>

                                            {" "}

                                            {room.CAPACITY}

                                        </p>

                                        <p>

                                            <strong>Occupied :</strong>

                                            {" "}

                                            {room.OCCUPIED_COUNT}

                                        </p>

                                        <p>

                                            <strong>Available :</strong>

                                            {" "}

                                            {available}

                                        </p>

                                        <p>

                                            <strong>Fee :</strong>

                                            {" "}

                                            ₹{room.FEE}

                                        </p>

                                        {

                                            available > 0 ?

                                            <span className="badge bg-success">

                                                Available

                                            </span>

                                            :

                                            <span className="badge bg-danger">

                                                Full

                                            </span>

                                        }

                                    </div>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default Rooms;