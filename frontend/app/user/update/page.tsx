import UpdateUser from "@/Component/User/UpdateUser";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback="Loading...">
      <UpdateUser />
    </Suspense>
  );
};

export default page;
