import { Component, useState } from "react"

type Props = {};

type State = {
    username: string;
};

export default function Login(props: Props) {
    const [username, setUsername] = useState("");
    return <div> Page 
        <input type="text" onChange={(e) => setUsername(e.currentTarget.value)} value={username}/>
    </div>
}

