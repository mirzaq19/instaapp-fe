import LoginForm from "@/components/forms/LoginForm";
import authApi from "@/services/api/auth/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type LoginData = {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async ({ email, password }: LoginData) => {
    console.log('Login attempt with:', { email, password });

    await toast
      .promise(authApi.login({
        email,
        password,
      }), {
        loading: 'Logging in...',
        success: 'Login successful!',
        error: (error) => {
          console.error('Login error:', error);
          return error instanceof Error ? error.message : 'Login failed';
        }
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
      })
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto min-h-main px-4 md:px-0">
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
}

export default Login;
