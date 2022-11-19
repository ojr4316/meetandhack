import { Component, useState } from "react"
export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    return(
        <form name="form1" action="/api/form" method="post">
          <h1>Login</h1>
          <label htmlFor="last">Email</label>
          <input type="text" onChange={(e) => setEmail(e.currentTarget.value)} value={email}/>
          <label htmlFor="last">Password</label>
          <input type="text" onChange={(e) => setPassword(e.currentTarget.value)} value={password}/>
          <button type="submit">Sign In</button>
        </form>
    )
    
}