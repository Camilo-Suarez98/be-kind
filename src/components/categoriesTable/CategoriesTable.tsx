import { useState, useEffect } from 'react';
import styles from './CategoriesTable.module.css';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { MdOutlineEdit, MdOutlineDelete, MdOutlineVisibility } from "react-icons/md";
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useCategoriesStore } from '../../store/categories.store';
import type { Category } from '../../store/categories.store';

export const CategoriesTable = ({ search }: { search?: string }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Category, direction: 'asc' | 'desc' } | null>(null);
  const {
    items,
    pageSize,
    totalElements,
    loading,
    error,
    fetchCategories
  } = useCategoriesStore();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = pageSize;
  useEffect(() => {
    fetchCategories(currentPage, pageSize);
  }, [currentPage, fetchCategories]);

  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(search?.toLowerCase() || '');
  });

  const sortedData = [...(filteredItems || [])].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: keyof Category) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name: string) => {
    if (!sortConfig || sortConfig.key !== name) return <FaSort color="#ccc" />;
    return sortConfig.direction === 'asc' ? <FaSortUp color="#28272A" /> : <FaSortDown color="#28272A" />;
  };

  const totalPagesInPage = Math.ceil(totalElements / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCategories(page, pageSize);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.wrapper}>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Nombre de la categoria {getSortIcon('name')}
              </div>
            </th>
            <th>Icono de la categoria</th>
            <th onClick={() => requestSort('status')} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Estado {getSortIcon('status')}
              </div>
            </th>
            <th onClick={() => requestSort('description')} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Descripción {getSortIcon('description')}
              </div>
            </th>
            <th onClick={() => requestSort('createdAt')} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Fecha de creación {getSortIcon('createdAt')}
              </div>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item: Category) => {
              const Icon = item.icon;
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className={styles.icon}>
                    <img
                      src={Icon}
                      className={styles.iconTable}
                      style={{ backgroundColor: item.color }}
                      alt="Icon"
                    />
                  </td>
                  <td>
                    <span className={item.status === 1 ? styles.active : styles.inactive}>
                      {item.status === 1 ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>{item.description}</td>
                  <td>{item.createdAt}</td>
                  <td>
                    <button className={styles.actionButton}>
                      <MdOutlineEdit />
                    </button>
                    <button className={styles.actionButton}>
                      <MdOutlineDelete />
                    </button>
                    <button className={styles.actionButton}>
                      <MdOutlineVisibility />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#656268' }}>
                No hay categorías.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <div className={styles.rowsPerPage}>
          <span>Resultados por página:</span>
          <select defaultValue={pageSize} onChange={(e) => fetchCategories(currentPage, Number(e.target.value))}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className={styles.pageInfo}>
          {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, totalElements)} de {totalElements}
        </div>
        <div className={styles.pageControls}>
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            <HiOutlineChevronDoubleLeft size={16} />
          </button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <HiOutlineChevronLeft size={16} />
          </button>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPagesInPage || totalElements === 0}>
            <HiOutlineChevronRight size={16} />
          </button>
          <button onClick={() => handlePageChange(totalPagesInPage)} disabled={currentPage === totalPagesInPage || totalElements === 0}>
            <HiOutlineChevronDoubleRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
