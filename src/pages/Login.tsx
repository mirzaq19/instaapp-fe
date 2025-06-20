import { useAppDispatch } from "@/app/hooks";
import { asyncLoginUser } from "@/app/thunks/authThunk";
import LoginForm from "@/components/forms/LoginForm";
import { useNavigate } from "react-router";

type LoginData = {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async ({ email, password }: LoginData) => {
    const status = await dispatch(asyncLoginUser(email, password));
    if (status) navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto min-h-main px-4 md:px-0">
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
}

export default Login;
