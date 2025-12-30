import { useForm } from 'react-hook-form';
import { http } from '../../api/http';
import { useActionsStore } from '../../store/actions.store';

interface FormValues {
  name: string;
  description: string;
  color: string;
}

export function CreateActionModal({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit } = useForm<FormValues>();
  const fetchActions = useActionsStore((s) => s.fetchActions);

  const onSubmit = async (data: FormValues) => {
    try {
      await http(
        'https://dev.api.bekindnetwork.com/api/v1/actions/admin-add',
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      fetchActions(1);
      onClose();
    } catch (error) {
      throw new Error(`The following error occurred: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} />
      <textarea {...register('description')} />
      <input type="color" {...register('color')} />
      <button type="submit">Crear</button>
    </form>
  );
};
