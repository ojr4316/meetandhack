import Head from "next/head";
import styles from "../styles/Layout.module.css";

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
        
      </header>
        <main>
            {props.children}
        </main>
      <footer></footer>
    </div>
  );
}
