import {useState} from "react";

const AddTask = function(props) {
    const [text, setText] = useState("")

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text) {
            alert("please add text");
            return;
        }

        setText("");
        document.getElementById("ipText").value = "";

        props.onAdd(text);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="input">
                <label htmlFor="ipText">Task: </label>
                <input type="text" id="ipText" onChange={(e) => setText(e.target.value)} />
            </div>
            <input type="submit" value="Add" />
        </form>
    )
}

export default AddTask