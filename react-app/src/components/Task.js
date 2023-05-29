const Task = function({task, onDelete}) {
    return (
        <div className="task">
            Task #{task.id}
            <p>{task.text}</p>
            <button onClick={() => onDelete(task.id)}>X</button>
        </div>
    )
}

export default Task;