import LoginForm from "@/components/modules/Auth/LoginForm";

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}

const LoginPage = async ({ searchParams }: LoginParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-900/60 p-4">
      <div className="w-full max-w-3xl animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
        <LoginForm redirectPath={redirectPath} />
      </div>
    </div>
  );
};

export default LoginPage;
