"use client";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/lib/config";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IUser } from "../Common/interface";

const AllUser = () => {
  const [loading, setLoading] = useState(false);
  const [allUserList, setAllUserList] = useState<IUser[]>([]);
  const init = async () => {
    try {
      setLoading(true);
      const response = await apiCall(Methods.GET, EndPoint.GET_ALL_USER);
      setAllUserList(response.data);
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
            <p className="text-lg font-medium">Add User</p>
            <p>A list of all the User in your account</p>
          </div>
          <Link
            href={"/user/create"}
            className="px-3 py-2 text-white bg-blue-500 rounded-md text-sm font-medium">
            Add User
          </Link>
        </div>
        {/* table Data  */}

        <div className="overflow-x-auto mt-6 border rounded-lg">
          <table className="w-full text-sm text-left">
            {/* ✅ Table Head */}
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">User Name</th>
                <th className="px-4 py-3 font-semibold">Display Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Age</th>
                <th className="px-4 py-3 font-semibold">Gender</th>
                <th className="px-4 py-3 font-semibold">Address</th>
                <th className="px-4 py-3 font-semibold">Role</th>
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
                allUserList &&
                allUserList.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{item.userName}</td>
                    <td className="px-4 py-3">{item.displayName}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3">{item.age}</td>
                    <td className="px-4 py-3">{item.gender}</td>
                    <td className="px-4 py-3">{item.address}</td>
                    <td className="px-4 py-3">{item.role}</td>

                    {/* Action */}
                    <td className="px-4 py-3">
                      <Link
                        href={`/user/update?id=${item._id}`}
                        className="text-blue-500 hover:underline text-sm">
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

export default AllUser;
