import Link from "next/link";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/dogs" className={styles.navLink}>
              Dogs
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
