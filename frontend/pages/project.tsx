import axios from "axios";
import { useState } from "react";

function createProject(name: string) {
    axios({ url: "/api/project", data: { name }, method: "POST" }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export default function Tag() {
    const [name, setName] = useState("");
    return (
        <div className="projectContainer">
            <h1>Create Project</h1>
            <label htmlFor="first">Name</label>
            <input type="text" onChange={(e) => setName(e.currentTarget.value)} value={name} />
            <button type="submit" onClick={() => createProject(name)}>Submit</button>
        </div>
    )

}