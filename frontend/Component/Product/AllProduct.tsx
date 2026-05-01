"use client";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/lib/config";
import { useEffect, useState } from "react";
import { IProduct } from "../Common/interface";
import Link from "next/link";

const AllProduct = () => {
  const [loading, setLoading] = useState(false);
  const [allProductData, setAllProductData] = useState<IProduct[]>([]);
  const init = async () => {
    try {
      setLoading(true);
      const response = await apiCall(Methods.GET, EndPoint.GET_ALL_PRODUCT);
      setAllProductData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <section className="lg:container lg:mx-auto flex items-center justify-center pt-10">
      <div className="border p-5 rounded-md min-w-7xl border-gray-300">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-medium">All Product</p>
            <p>A list of all the Product in your account</p>
          </div>
          <Link
            href={"/product/create"}
            className="px-3 py-2 text-white bg-blue-500 rounded-md text-sm font-medium">
            Add Product
          </Link>
        </div>
        {/* table Data  */}

        <div className="overflow-x-auto mt-6 border rounded-lg">
          <table className="w-full text-sm text-left">
            {/* ✅ Table Head */}
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Product Name</th>
                <th className="px-4 py-3 font-semibold">Display Name</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Brand</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            {/* ✅ Table Body */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : (
                allProductData.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{item.productName}</td>
                    <td className="px-4 py-3">{item.productDisplayName}</td>
                    <td className="px-4 py-3">৳ {item.price}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">{item.brand}</td>
                    <td className="px-4 py-3">{item.stock}</td>
                    <td className="px-4 py-3">{item.rating}</td>

                    {/* Status badge */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}>
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    {/* Action */}
                    <td className="px-4 py-3">
                      <Link
                        href={`/product/update?id=${item._id}`}
                        className="text-blue-500 hover:underline text-sm cursor-pointer">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
