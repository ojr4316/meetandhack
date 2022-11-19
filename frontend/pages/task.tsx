import axios from "axios";
import { useState } from "react";

function createtask(name:string, project:number){
    axios.post('/api/task',{name: name,project_id:project}).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err.response.data);
    });
}

function deletetask(name:string,project:number){
    axios({url: '/api/task',data:{name:name,project_id:project}, method:"DELETE"}).then((res) => {
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
            <button type="submit" onClick={() => createtask(name,parseInt(project))}>Submit</button>
            <div>
            <h1>Delete Task</h1>
            <label htmlFor="first">Task Name</label>
            <input type="text" onChange={(e) => setName(e.currentTarget.value)} value={name} />
            <label>Project name</label>
            <input type="text" onChange={(e) => setProject(e.currentTarget.value)} value={project} />
            <button onClick={() => deletetask(name,parseInt(project))}>delete</button>

            </div>
        </div>
        
    )

}