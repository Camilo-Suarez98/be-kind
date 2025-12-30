import styles from './Sidebar.module.css';
import {
  MdHome,
  MdPeople,
  MdAttachMoney,
  MdStore,
  MdContentCopy,
  MdCategory,
  MdOutlineLogout
} from 'react-icons/md';
import { FaHandHoldingHeart, FaMedal } from 'react-icons/fa';

const items = [
  { name: 'Home', icon: MdHome },
  { name: 'Impacto Social', icon: FaHandHoldingHeart },
  { name: 'Comunidad', icon: MdPeople },
  { name: 'Sponsors', icon: MdAttachMoney },
  { name: 'Marketplace', icon: MdStore },
  { name: 'Bakanes', icon: FaMedal },
  { name: 'Contenidos', icon: MdContentCopy },
  { name: 'Categorias de acciones', icon: MdCategory },
];

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <img src="/logo-sidebar.png" className={styles.logo} />
      <nav className={styles.nav}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={
                item.name === 'Bakanes' ? styles.item + ' ' + styles.active : styles.item
              }
            >
              <Icon className={styles.icon} size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <button className={styles.logout}>
        <MdOutlineLogout />
        Cerrar sesión
      </button>
    </aside>
  );
};
