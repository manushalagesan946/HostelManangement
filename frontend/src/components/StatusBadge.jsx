function StatusBadge({ status }) {

    const getBadgeClass = () => {

        switch (status?.toLowerCase()) {

            case "approved":
                return "bg-success";

            case "pending":
                return "bg-warning text-dark";

            case "rejected":
                return "bg-danger";

            case "paid":
                return "bg-success";

            case "unpaid":
                return "bg-secondary";

            default:
                return "bg-primary";
        }
    };

    return (
        <span className={`badge ${getBadgeClass()}`}>
            {status}
        </span>
    );
}

export default StatusBadge;