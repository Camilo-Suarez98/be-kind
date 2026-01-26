import "../../styles/globals.css";
import { useAuthStore } from "../../store/auth.store";
import { useForm } from "react-hook-form";
import { http } from "../../api/http";
import styles from "./Login.module.css";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  username: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit, watch } = useForm<LoginProps>();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const username = watch('username');
  const password = watch('password');
  const isFormValid = username && password && username.trim() !== '' && password.trim() !== '';

  const onSubmit = async (data: LoginProps) => {
    try {
      const token = await http<string>(
        'https://dev.apinetbo.bekindnetwork.com/api/Authentication/Login',
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      login(token);
      navigate('/dashboard');
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
          <label htmlFor="username">Correo electrónico*</label>
          <div className={styles.loginInputBox}>
            <MdOutlineMailOutline className={styles.loginIcon} />
            <input
              {...register('username', { required: true })}
              autoComplete="on"
              placeholder="a.berrio@yopmail.com"
            />
          </div>
          <label htmlFor="password" className={styles.loginLabelPassword}>Contraseña*</label>
          <div className={styles.loginInputBox}>
            <MdLockOutline className={styles.loginIcon} />
            <input
              type={showPassword ? "text" : "password"}
              {...register('password', { required: true })}
              autoComplete="on"
              placeholder="AmuFK8G4Bh64Q1uX+IxQhw=="
            />
            <button
              type="button"
              className={styles.togglePasswordButton}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
          <a href="#" className={styles.recoveryPassword}>Recuperar contraseña</a>
          <button type="submit" className={styles.loginButton} disabled={!isFormValid}>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};
