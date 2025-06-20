import RegisterForm from "@/components/forms/RegisterForm";
import authApi from "@/services/api/auth/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type RegisterData = {
  name: string;
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = async ({
    name,
    email,
    username,
    password,
    passwordConfirmation
  }: RegisterData) => {
    await toast
      .promise(authApi.register({
        name,
        email,
        username,
        password,
        password_confirmation: passwordConfirmation
      }), {
        loading: 'Registering...',
        success: 'Registration successful!',
        error: (error) => {
          console.error('Registration error:', error);
          return error instanceof Error ? error.message : 'Registration failed';
        }
      })
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error.message);
      })
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto min-h-main px-4 md:px-0">
      <RegisterForm handleRegister={handleRegister} />
    </div>
  );
}

export default Register;
