import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-[85dvh] flex justify-center items-center">
      {children}
    </main>
  );
};

export default AuthLayout;
