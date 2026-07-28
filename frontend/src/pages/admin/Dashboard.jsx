import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardCard from "../../components/DashboardCard";
import Loader from "../../components/Loader";
function Dashboard() {

    const [stats, setStats] = useState(null);

    const fetchDashboard = async () => {
        try {
            const response = await api.get("/dashboard");
            setStats(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

     if (!stats) {
        return <Loader />;
    }

    return (
        <div>

            <h2 className="mb-4">
                Admin Dashboard
            </h2>

            <div className="row">

              <DashboardCard
                  title="Total Students"
                  value={stats.TOTAL_STUDENTS}
                  icon="bi bi-people-fill"
                  color="bg-primary text-white"
              />

              <DashboardCard
                  title="Total Rooms"
                  value={stats.TOTAL_ROOMS}
                  icon="bi bi-building"
                  color="bg-info text-white"
              />

              <DashboardCard
                  title="Available Rooms"
                  value={stats.AVAILABLE_ROOMS}
                  icon="bi bi-house-check-fill"
                  color="bg-success text-white"
              />

              <DashboardCard
                  title="Full Rooms"
                  value={stats.FULL_ROOMS}
                  icon="bi bi-house-lock-fill"
                  color="bg-danger text-white"
              />

              <DashboardCard
                  title="Pending Requests"
                  value={stats.PENDING_REQUESTS}
                  icon="bi bi-hourglass-split"
                  color="bg-warning"
              />

              <DashboardCard
                  title="Approved"
                  value={stats.APPROVED_REQUESTS}
                  icon="bi bi-check-circle-fill"
                  color="bg-success text-white"
              />

              <DashboardCard
                  title="Rejected"
                  value={stats.REJECTED_REQUESTS}
                  icon="bi bi-x-circle-fill"
                  color="bg-danger text-white"
              />

              <DashboardCard
                  title="Revenue"
                  value={`₹ ${stats.TOTAL_REVENUE}`}
                  icon="bi bi-cash-stack"
                  color="bg-dark text-white"
              />

          </div>

        </div>
    );
}

export default Dashboard;