import "../../styles/globals.css";
import { useAuthStore } from "../../store/auth.store";
import { useForm } from "react-hook-form";
import { http } from "../../api/http";
import styles from "./Login.module.css";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";

interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginProps>();
  const login = useAuthStore((state) => state.login);

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
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <img src="./login-logo.png" alt="Be kind logo" />
        <h2>¡Empieza a conectar tu comunidad ante buenas acciones!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
          <label htmlFor="email">Correo electrónico*</label>
          <div className={styles.loginInputBox}>
            <MdOutlineMailOutline className={styles.loginIcon} />
            <input {...register('email', { required: true })} />
          </div>
          <label htmlFor="password" className={styles.loginLabelPassword}>Contraseña*</label>
          <div className={styles.loginInputBox}>
            <MdLockOutline className={styles.loginIcon} />
            <input {...register('password', { required: true })} />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  )
}