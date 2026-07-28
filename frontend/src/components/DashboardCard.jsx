function DashboardCard({ title, value, icon, color }) {

    return (

        <div className="col-md-3 mb-4">

            <div className={`card border-0 shadow ${color}`}>

                <div className="card-body text-center">

                    <i
                        className={`${icon} fs-1 mb-3`}
                    ></i>

                    <h5>{title}</h5>

                    <h2>{value}</h2>

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;