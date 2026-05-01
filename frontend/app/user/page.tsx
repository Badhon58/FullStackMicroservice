import AllUser from "@/Component/User/AllUser";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback="Loading...">
      <AllUser />
    </Suspense>
  );
};

export default page;
