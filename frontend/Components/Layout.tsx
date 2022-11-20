/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/Layout.module.css";
import logo from "../public/assets/logo.png";

type Props = {
  children: JSX.Element[] | JSX.Element;
  page: string;
};

export default function Layout(props: Props) {
  return (
    <div className={styles.page_container}>
      <Head>
        <title>Meet and Hack</title>
        <meta name="description" content="Meet and hack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <a className={styles.a} href="">
            <img src={logo.src} alt="" width="50px" />
          </a>
        </div>
        <nav className={styles.nav}>
          <ul id={styles.MenuItems}>
            <li>
              <a className={styles.a} href="/pro">
                Set Projects
              </a>
            </li>
            <li>
              <a className={styles.a} href="/daily-tasks">
                Your Daily Tasks
              </a>
            </li>
            <li>
              <a className={styles.a} href="/tag">
                Work Tags
              </a>
            </li>
            <li>
              <a className={styles.a} href="/api/logout">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>{props.children}</main>
      <footer></footer>
    </div>
  );
}
