import axios from "axios";
import { useState } from "react";

function createtask(name:string, project:string){
    axios.post('/api/task',{name,project}).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err.response.data);
    });
}

export default function Task() {
    const [name, setName] = useState("");
    const [project,setProject] = useState("");
    return (
        <div className="taskContainer">
            <h1>Create Task</h1>
            <label htmlFor="first">Task Name</label>
            <input type="text" onChange={(e) => setName(e.currentTarget.value)} value={name} />
            <label>Project name</label>
            <input type="text" onChange={(e) => setProject(e.currentTarget.value)} value={project} />
            <button type="submit" onClick={() => createtask(name,project)}>Submit</button>
        </div>
    )

}