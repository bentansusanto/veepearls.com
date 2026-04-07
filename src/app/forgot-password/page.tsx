import MainLayout from "@/components/layout/MainLayout";
import FormForgotPassword from "@/features/Authentication/ForgotPassword/FormForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-20 px-6">
        <FormForgotPassword />
      </div>
    </MainLayout>
  );
};

export default ForgotPasswordPage;
