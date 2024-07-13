import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a href="/characters">Characters</a>
        <a href="/episodes">Episodes</a>
        <a href="/locations">Locations</a>
      </div>
    </main>
  );
}
