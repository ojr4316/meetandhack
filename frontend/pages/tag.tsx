import axios from "axios";
import { useState } from "react";

function createTag(name: string) {
    axios({ url: "/api/tag", data: { name }, method: "POST" }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export default function Tag() {
    const [name, setName] = useState("");
    return (
        <div className="tagContainer">
            <h1>Create Tag</h1>
            <label htmlFor="first">Name</label>
            <input type="text" onChange={(e) => setName(e.currentTarget.value)} value={name} />
            <button type="submit" onClick={() => createTag(name)}>Submit</button>
        </div>
    )

}