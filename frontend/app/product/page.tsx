import AllProduct from "@/Component/Product/AllProduct";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <AllProduct />
    </Suspense>
  );
};

export default page;
