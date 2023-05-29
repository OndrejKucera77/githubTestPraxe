import Task from "./Task";

const Tasks = function(props) {
    return (
        <div className="tasks">
            {props.tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={props.onDelete} />
            ))}
        </div>
    )
}

export default Tasks;