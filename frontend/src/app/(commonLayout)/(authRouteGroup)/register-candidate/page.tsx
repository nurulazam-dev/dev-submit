import CandidateRegisterForm from "@/components/modules/Auth/CandidateRegisterForm";

export default async function CandidateRegisterPage() {
  const redirectPath = "/verify-email";

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-900/60 p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
        <CandidateRegisterForm redirectPath={redirectPath} />
      </div>
    </div>
  );
}
