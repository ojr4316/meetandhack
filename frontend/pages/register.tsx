import axios from "axios";
import { useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { loginHandler, sessionOptions } from "../lib/session";
import styles from "../styles/Login.module.css";
export const getServerSideProps = withIronSessionSsr(
  loginHandler,
  sessionOptions
);

function register(
  username: string,
  password: string,
  email: string,
  name: string
) {
  axios({
    url: "/api/register",
    data: { username, password, email, name },
    method: "POST",
  }).then((res) => {
    console.log(res);
  });
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="page-container">
      <br />
      <br />
      <div className={styles.loginForm}>
        <h1 className={styles.h1}>Register</h1>
        <label className={styles.lbl}>Email</label>
        <input
          className={styles.inputField}
          type="text"
          onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}
        />
        <label className={styles.lbl}>Name</label>
        <input
          className={styles.inputField}
          type="text"
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
        />
        <label className={styles.lbl}>Username</label>
        <input
          className={styles.inputField}
          type="text"
          onChange={(e) => setUsername(e.currentTarget.value)}
          value={username}
        />
        <label className={styles.lbl}>Password</label>
        <input
          className={styles.inputField}
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
        />
        <div className={styles.action}>
          <button className={`${styles.button} ${styles.secondary_button}`}>
            <a href="/login">Login</a>
          </button>
          <button
            className={`${styles.button} ${styles.primary_button}`}
            type="submit"
            onClick={() => register(username, password, email, name)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
