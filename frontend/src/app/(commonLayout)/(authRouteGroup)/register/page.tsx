import StudentRegisterForm from "@/components/modules/Auth/StudentRegisterForm";

export default async function StudentRegisterPage() {
  const redirectPath = "/login";

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-900/60 p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
        <StudentRegisterForm redirectPath={redirectPath} />
      </div>
    </div>
  );
}
