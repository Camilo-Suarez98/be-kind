import styles from './Dashboard.module.css';
import { Sidebar } from '../../components/layout/Sidebar';
import { Topbar } from '../../components/layout/Topbar';

export const Dashboard = () => {
  return (
    <div className={styles.layout}>
      <Topbar />
      <Sidebar />
      <main className={styles.content}>
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}
