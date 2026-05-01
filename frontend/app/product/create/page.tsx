import Create from "@/Component/Product/Create";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Create />
    </Suspense>
  );
};

export default page;
