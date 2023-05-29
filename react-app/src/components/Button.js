import PropTypes from "prop-types";

const Button = function(props) {
    return (
        <button onClick={props.onClick} style={{"backgroundColor": props.colour}}>
            {props.text}
        </button>
    )
}

Button.defaultProps = {
    text: "",
    colour: "initial",
    onClick: "undefined"
}

Button.propTypes = {
    text: PropTypes.string,
    colour: PropTypes.string,
    onClick: PropTypes.func
}

export default Button