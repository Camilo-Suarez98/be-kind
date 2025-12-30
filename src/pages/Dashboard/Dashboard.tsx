import styles from './Dashboard.module.css';
import { Sidebar } from '../../components/layout/Sidebar';
import { Topbar } from '../../components/layout/Topbar';
import { IoIosSearch } from "react-icons/io";
import { MdOutlineFilterAlt } from "react-icons/md";
import { CategoriesTable } from '../../components/categoriesTable/CategoriesTable';

import { useState } from 'react';

import { CreateActionModal } from '../../components/createActionModal/CreateActionModal';

export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Topbar />
      <Sidebar />
      <main className={styles.content}>
        <h1 className={styles.dashboardTitle}>Categorias</h1>
        <div className={styles.tabs}>
          <button className={styles.active}>Categorias</button>
          <button>Tipos</button>
          <button>Evidencias</button>
        </div>

        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <input
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IoIosSearch />
            </div>
            <button className={styles.filterButton}>
              <MdOutlineFilterAlt />
              Filtros
            </button>
          </div>
          <button
            className={styles.buttonToCreate}
            onClick={() => setIsModalOpen(true)}
          >
            Crear tipo de categoria
          </button>
        </div>

        <CategoriesTable search={searchTerm} />

        {isModalOpen && (
          <CreateActionModal onClose={() => setIsModalOpen(false)} />
        )}
      </main>
    </div>
  );
}
