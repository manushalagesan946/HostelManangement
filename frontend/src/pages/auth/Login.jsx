import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/login",
                formData
            );

            const { token, user } = response.data.data;

            login(user, token);

            if (user.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/student/dashboard");
            }

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h3 className="text-center mb-4">
                                Hostel Management Login
                            </h3>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;