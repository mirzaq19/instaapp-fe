import RegisterForm from "@/components/forms/RegisterForm";

type RegisterData = {
  name: string;
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

function Register() {
  const handleRegister = async ({
    name,
    email,
    username,
    password,
    passwordConfirmation
  }: RegisterData) => {
    console.log('Registering user:', { name, email, username, password, passwordConfirmation });
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto min-h-main px-4 md:px-0">
      <RegisterForm handleRegister={handleRegister} />
    </div>
  );
}

export default Register;
