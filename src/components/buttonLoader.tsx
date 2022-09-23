const ButtonLoader = (props: any) => {
    return (
        <button className="btn btn-primary" type="button" disabled>
            <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
            ></span>
            &nbsp;
            {props.text}
        </button>
    );
};

ButtonLoader.defaultProps = {
    text: "Saving...",
};

export default ButtonLoader;