import AllProduct from "@/Component/Product/AllProduct";
import AllUser from "@/Component/User/AllUser";
import React from "react";

const page = () => {
  return (
    <section className="min-h-screen ">
      <AllProduct />
      {/* <p className="my-3"></p> */}
      <AllUser />
    </section>
  );
};

export default page;
