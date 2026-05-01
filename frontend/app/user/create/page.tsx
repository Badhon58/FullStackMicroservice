import CreateUser from "@/Component/User/CreateUser";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback="Loading...">
      <CreateUser />
    </Suspense>
  );
};

export default page;
