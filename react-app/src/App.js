import React from "react";
import {useState} from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);

    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "bla bla bla"
        },
        {
            id: 2,
            text: "doktor"
        },
        {
            id: 3,
            text: "zubař"
        }
    ])

    const deleteTask = function(id) {
        setTasks(tasks.filter(function (task) {
            return (task.id !== id);
        }))
    }

    const addTask = function(text) {
        const id=Math.floor(Math.random()*10000)+1;
        setTasks([...tasks, {id, text}]);
    }

    return (
        <div className="App">
            <Header title="Apka" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} /> : "No tasks"}
        </div>
    );
}

/*class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
            </div>
        );
    }
}*/

export default App;