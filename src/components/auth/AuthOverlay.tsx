import AuthForm from "./AuthForm";

const AuthOverlay = () => {
  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthOverlay;