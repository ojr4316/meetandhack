import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    return (
        <form name="form1" action="/api/form" method="post">
            <h1>Register</h1>
            <label htmlFor="email">Email</label>
            <input type="text" onChange={(e) => setEmail(e.currentTarget.value)} value={email}/>
            <label htmlFor="first">First Name</label>
            <input type="text" onChange={(e) => setFirstName(e.currentTarget.value)} value={firstName}/>
            <label htmlFor="last">Last Name</label>
            <input type="text" onChange={(e) => setLastName(e.currentTarget.value)} value={lastName}/>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e) => setPassword(e.currentTarget.value)} value={password}/>
            <button type="submit">Submit</button>
        </form>
    )

}

