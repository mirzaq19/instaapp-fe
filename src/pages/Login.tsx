import LoginForm from "@/components/forms/LoginForm";

type LoginData = {
  email: string;
  password: string;
}

const Login = () => {
  const handleLogin = async ({ email, password }: LoginData) => {
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto min-h-main px-4 md:px-0">
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
}

export default Login;
