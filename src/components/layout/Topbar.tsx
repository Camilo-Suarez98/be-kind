import styles from './Topbar.module.css';

export const Topbar = () => {
  return (
    <header className={styles.topbar}>
      <img src="/logo-white.png" alt="White logo of be kind" />
      <div className={styles.avatar}>A</div>
    </header>
  );
}
