import Background from "../components/shared/Background";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Background />
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
