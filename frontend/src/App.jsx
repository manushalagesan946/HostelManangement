import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import PendingBookings from "./pages/admin/PendingBookings";
import AdminDashboard from "./pages/admin/Dashboard";
import StudentDashboard from "./pages/student/Dashboard";
import Students from "./pages/admin/Students";
import Bookings from "./pages/admin/Bookings";
import Payments from "./pages/admin/Payments";
import Rooms from "./pages/student/Rooms";



function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Login */}

                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Student */}

                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute role="STUDENT">
                            <StudentLayout>
                                <StudentDashboard />
                            </StudentLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/rooms"
                    element={
                        <ProtectedRoute role="STUDENT">
                            <StudentLayout>
                                <Rooms />
                            </StudentLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Admin */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <AdminLayout>
                                <AdminDashboard />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                  path="/admin/pending"
                  element={
                      <ProtectedRoute role="ADMIN">
                          <AdminLayout>
                              <PendingBookings />
                          </AdminLayout>
                      </ProtectedRoute>
                  }
              />
              <Route
                path="/admin/students"
                element={
                    <ProtectedRoute role="ADMIN">
                        <AdminLayout>
                            <Students />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/bookings"
                element={
                    <ProtectedRoute role="ADMIN">
                        <AdminLayout>
                            <Bookings />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/payments"
                element={
                    <ProtectedRoute role="ADMIN">
                        <AdminLayout>
                            <Payments />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

            </Routes>

        </BrowserRouter>
    );
}

export default App;