import axios from "axios";
import { useState } from "react";
import Layout from "../Components/Layout";
import styles from "../styles/CreateProject.module.css";

function createProject(name: string) {
    axios({ url: "/api/project", data: { name }, method: "POST" }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export default function Tag() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    return (
        <Layout page="Project">
        <div className={styles.projectContainer}>
            <h1>Create Project</h1>
            <ul className={styles.list}>
            <li><label htmlFor="name">Project Name:</label></li>
            <li><input type="text" onChange={(e) => setName(e.currentTarget.value)} value={name} /></li>
            <li><label htmlFor="desc">Enter Description:</label></li>
            <li><textarea className={styles.desc} type="string" onChange={(e) => setDesc(e.currentTarget.value)} value={desc} /></li>
            <li><button type="submit" onClick={() => createProject(name)}>Submit</button></li>
            </ul>
        </div>
        </Layout>
    )

}