import { Component, useState } from "react";
import axios from "axios";

function login(email: string, password: string) {
  axios.post("/api/login", {email, password}).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
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
    </div>
  );
}
