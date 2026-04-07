import MainLayout from "@/components/layout/MainLayout";
import FormResetPassword from "@/features/Authentication/ResetPassword/FormResetPassword";

const ResetPasswordPage = () => {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-20 px-6">
        <FormResetPassword />
      </div>
    </MainLayout>
  );
};

export default ResetPasswordPage;
