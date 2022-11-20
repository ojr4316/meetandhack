import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Component } from "react";
import Layout from "../Components/Layout";
import { protectedHandler, sessionOptions } from "../lib/session";
import styles from "../styles/Home.module.css";
import axios from "axios";

type Props = {};

type State = {
  prompt: string;
};

export const getServerSideProps = withIronSessionSsr(
  protectedHandler,
  sessionOptions
);

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      prompt: "",
    };
  }

  getTaskInfo = () => {
    const { prompt } = this.state;
    axios
      .post("/api/comprehend", { input: prompt })
      .then((res) => {
        if (res.data.task) {
          console.log(res.data.task)
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  render() {
    const { prompt } = this.state;
    return (
      <Layout page="Home">
        <div className={styles.prompt_container}>
          <h1>Welcome to TAZK: Project Managment Made Easy</h1>
          <h4>To Begin, Let{"'"}s write our first task statement</h4>
          <div className={styles.prompt_line}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => this.setState({ prompt: e.currentTarget.value })}
              className={styles.prompt}
            />
            <button className={styles.prompt_submit} onClick={() => this.getTaskInfo()}>Create Task</button>
          </div>
        </div>
      </Layout>
    );
  }
}
