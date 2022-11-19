import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Component } from "react";
import Layout from "../Components/Layout";
import { protectedHandler, sessionOptions } from "../lib/session";
import styles from "../styles/Home.module.css";

type Props = {};

type State = {};

export const getServerSideProps = withIronSessionSsr(protectedHandler, sessionOptions);

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Layout page="Home">
        <p>Project Management Application</p>
        <button>
          <Link href="/login"> Login</Link>
        </button>
        <button>
          <Link href="/register"> Register</Link>
        </button>
        <Link href="/api/logout"> Logout</Link>

        <h1>Welcome to Project Managment Made Easy</h1>
      </Layout>
    
    );
  }
}
