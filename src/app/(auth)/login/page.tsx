import LoginForm from "@/components/login/login-form";

const LoginPage = () => {
  return (
    <div className="container max-w-[500px] pt-5 h-screen mx-auto bg-violet-800 text-white">
      <h1 className="font-semibold text-3xl">Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
