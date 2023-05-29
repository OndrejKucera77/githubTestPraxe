import PropTypes from "prop-types";
import Button from "./Button";

const Header = function(props) { //nebo ({title}) => využije se jen title namísto props.title
    return (
        <header>
            <h1>{props.title}</h1>
            <Button colour="#0ff" text={props.showAdd ? "Hide form" : "Show form"} onClick={props.onAdd} />
        </header>
    )
}

Header.defaultProps = {
    title: "React App"
}

Header.propTypes = {
    title: PropTypes.string
}


/*const styl = {
    color: "red",
    backgroundColor: "black",
    padding: "3px"
}*/

export default Header