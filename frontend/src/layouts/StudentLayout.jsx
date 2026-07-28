import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function StudentLayout({ children }) {

    return (

        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    {children}

                </div>

            </div>
        </>

    );

}

export default StudentLayout;