import { useForm } from 'react-hook-form';
import { useCategoriesStore } from '../../store/categories.store';
import styles from './CreateActionModal.module.css';
import { MdClose, MdFileUpload } from 'react-icons/md';
import { useState } from 'react';

interface FormValues {
  name: string;
  description: string;
  color: string;
  active: boolean;
  icon: FileList;
  status: number;
}

export const CreateActionModal = ({ onClose }: { onClose: () => void }) => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      active: true,
      status: 1
    }
  });
  const addCategory = useCategoriesStore((s) => s.addCategory);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        ...data,
        status: data.active ? 1 : 0,
      };

      await addCategory(payload);
      onClose();
    } catch (error) {
      console.error(error);
      setSubmitError('Error al crear la categoría. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Crear categoria</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <MdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label>Nombre de la categoria*</label>
              <input
                placeholder="Escribe el nombre de la buena acción"
                {...register('name', { required: 'El nombre es requerido' })}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Descripción de la buena acción*</label>
              <textarea
                placeholder="Agregar descripción"
                {...register('description', { required: 'La descripción es requerida', maxLength: 200 })}
              />
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#666' }}>150/200</div>
              {errors.description && <span className={styles.error}>{errors.description.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Logo*</label>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept="image/*"
                  {...register('icon')}
                  placeholder="Carga archivo"
                  className={styles.fileFakeInput}
                />
                <MdFileUpload className={styles.uploadIcon} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Color*</label>
              <input
                placeholder="Registra color codigo HEX"
                {...register('color', { required: 'El color es requerido' })}
              />
              {errors.color && <span className={styles.error}>{errors.color.message}</span>}
            </div>

            <div className={styles.toggleGroup}>
              <label className={styles.switch}>
                <input type="checkbox" {...register('active')} />
                <span className={styles.slider}></span>
              </label>
              <span>Activo</span>
            </div>

            {submitError && <div className={styles.error} style={{ marginTop: '10px' }}>{submitError}</div>}
          </div>

          <div className={styles.footer}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
