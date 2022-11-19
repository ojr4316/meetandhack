import axios from "axios";
import { useState } from "react";

function register(username: string, password: string, email: string, name: string) {
    axios({url: "/api/register", data: {username, password, email, name}}).then((res) => {
      console.log(res);
    });
  }

export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <form name="form1" action="/api/form" method="post">
            <h1>Register</h1>
            <label htmlFor="email">Email</label>
            <input type="text" onChange={(e) => setEmail(e.currentTarget.value)} value={email}/>
            <label htmlFor="first">Name</label>
            <input type="text" onChange={(e) => setName(e.currentTarget.value)} value={name}/>
            <label htmlFor="last">Username</label>
            <input type="text" onChange={(e) => setUsername(e.currentTarget.value)} value={username}/>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e) => setPassword(e.currentTarget.value)} value={password}/>
            <button type="submit">Submit</button>
        </form>
    )

}

