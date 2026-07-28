import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

function Payments() {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchPayments = async () => {

        try {

            const response = await api.get("/payments");

            setPayments(response.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchPayments();

    }, []);

    if (loading) {

        return <Loader />;

    }

    const filteredPayments = payments.filter((payment) =>

        payment.NAME.toLowerCase().includes(search.toLowerCase()) ||

        payment.REGISTER_NO.toLowerCase().includes(search.toLowerCase()) ||

        payment.RECEIPT_NUMBER.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div>

            <h2 className="mb-4">
                Payments
            </h2>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Name, Register No or Receipt"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="table-responsive">

                <table className="table table-striped table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>Payment ID</th>
                            <th>Student</th>
                            <th>Register No</th>
                            <th>Block</th>
                            <th>Room</th>
                            <th>Amount</th>
                            <th>Receipt</th>
                            <th>Payment Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredPayments.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center"
                                    >
                                        No Payments Found
                                    </td>

                                </tr>

                            )

                            :

                            filteredPayments.map((payment) => (

                                <tr key={payment.PAYMENT_ID}>

                                    <td>{payment.PAYMENT_ID}</td>

                                    <td>{payment.NAME}</td>

                                    <td>{payment.REGISTER_NO}</td>

                                    <td>{payment.BLOCK_NAME}</td>

                                    <td>{payment.ROOM_NUMBER}</td>

                                    <td>₹{payment.AMOUNT}</td>

                                    <td>{payment.RECEIPT_NUMBER}</td>

                                    <td>

                                        {new Date(payment.PAYMENT_DATE)
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

export default Payments;