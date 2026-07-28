import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

function Students() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchStudents = async () => {

        try {

            const response = await api.get("/students");

            setStudents(response.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchStudents();

    }, []);

    if (loading) {

        return <Loader />;

    }

    const filteredStudents = students.filter((student) =>
        student.NAME.toLowerCase().includes(search.toLowerCase()) ||
        student.REGISTER_NO.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div>

            <h2 className="mb-4">
                Students
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Register No</th>
                            <th>Department</th>
                            <th>Year</th>
                            <th>Gender</th>
                            <th>Phone</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredStudents.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center"
                                        >
                                            No Students Found
                                        </td>

                                    </tr>

                                )

                                :

                                filteredStudents.map((student) => (

                                    <tr key={student.STUDENT_ID}>

                                        <td>{student.STUDENT_ID}</td>

                                        <td>{student.NAME}</td>

                                        <td>{student.EMAIL}</td>

                                        <td>{student.REGISTER_NO}</td>

                                        <td>{student.DEPARTMENT}</td>

                                        <td>{student.YEAR}</td>

                                        <td>{student.GENDER}</td>

                                        <td>{student.PHONE}</td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Students;