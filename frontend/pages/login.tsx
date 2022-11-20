import { Component, useState } from "react";
import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import { loginHandler, sessionOptions } from "../lib/session";
export const getServerSideProps = withIronSessionSsr(loginHandler, sessionOptions);
import styles from "../styles/Login.module.css";

function login(email: string, password: string) {
  axios.post("/api/login", { email, password }).then((res) => {
    window.location.href = "/";
  }).catch((err) => {
    console.log(err);
  });
}


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="page-container">
      <br />
      <br />
      <div className= {styles.loginForm}>
        <h1 className={styles.h1}>Login</h1>
        <label className="lb1" htmlFor="last">Email</label>
        <input
          className={styles.inputField}
          type="text"
          onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}
        />
        <label className="lb1"htmlFor="last">Password</label>
        <input
        className={styles.inputField}
          type="text"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
        />
        <div className={styles.action}>
        <button className={styles.button} type="submit" onClick={() => login(email, password)}>Sign In</button>
        <button className={styles.button}> <a href="/register">Register</a> </button>
        </div>
      </div>
    </div>
  );
}
