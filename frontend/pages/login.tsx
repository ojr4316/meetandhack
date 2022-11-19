import { Component, useState } from "react";
import axios from "axios";

function login(username: string, password: string) {
  axios({url: "/api/login", data: {username, password}}).then((res) => {
    console.log(res);
  });
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form name="form1" action="/api/form" method="post">
      <h1>Login</h1>
      <label htmlFor="last">Email</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.currentTarget.value)}
        value={email}
      />
      <label htmlFor="last">Password</label>
      <input
        type="text"
        onChange={(e) => setPassword(e.currentTarget.value)}
        value={password}
      />
      <button type="submit" onClick={() => login(email, password)}>Sign In</button>
    </form>
  );
}
