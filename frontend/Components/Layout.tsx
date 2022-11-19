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
        <title>Untitled</title>
        <meta name="description" content="Meet and hack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className="container">
          <div className="navbar">
            <div className="logo">

              <a href=""><img src={logo.src} alt="" width="50px"/></a>
            </div>
            <nav>
              <ul id="MenuItems">
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                {/* <li><a href="/about.html"></a></li>
                <li><a href="/contact.html">Contact</a></li>
                <li><a href="/account.html">Account</a></li> */}
              </ul>
            </nav>
          </div>
        </div>
        </header>
      <main>
        {props.children}
      </main>
      <footer></footer>
    </div>
  );
}
