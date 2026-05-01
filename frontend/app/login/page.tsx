import LoginForm from "@/Component/Common/LoginForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback="loading....">
      <LoginForm />
    </Suspense>
  );
};

export default page;
