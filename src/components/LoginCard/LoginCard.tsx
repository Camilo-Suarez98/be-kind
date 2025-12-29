import { useForm } from "react-hook-form";
import { http } from "../../api/http";
import { useAuthStore } from "../../store/auth.store";

interface LoginProps {
  email: string;
  password: string;
}

export const LoginCard = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuthStore();

  const onSubmit = async (data: LoginProps) => {
    try {
      const res = await http<{ token: string }>(
        'https://dev.apinetbo.bekindnetwork.com/api/Authentication/Login',
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      login(res.token);
    } catch (error) {
      throw new Error(`The following error occurred: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Correo electrónico*</label>
      <input {...register('email', { required: true })} />
      <label htmlFor="password">Contraseña*</label>
      <input {...register('password', { required: true })} />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};