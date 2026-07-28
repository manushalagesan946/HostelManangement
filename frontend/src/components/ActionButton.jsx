function ActionButton({
    text,
    icon,
    color,
    onClick
}) {

    return (

        <button
            className={`btn btn-${color} btn-sm me-2`}
            onClick={onClick}
        >
            <i className={`${icon} me-1`}></i>

            {text}
        </button>

    );

}

export default ActionButton;