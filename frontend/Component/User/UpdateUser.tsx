"use client";
import React, { useEffect, useState } from "react";
import Input from "../Common/Input";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/lib/config";
import { useRouter, useSearchParams } from "next/navigation";

const UpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    displayName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "Male",
    address: "",
    role: "",
  });
  const router = useRouter();
  const searchparams = useSearchParams();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const id = searchparams.get("id");
      const response = await apiCall(
        Methods.PATCH,
        `${EndPoint.UPDATE_SINGLE_USER}/${id}`,
        formData,
      );
      if (response.success) {
        router.push("/user");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const init = async () => {
    try {
      setInitialLoading(true);
      const id = searchparams.get("id");
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.GET_SINGLE_USER}/${id}`,
      );
      setFormData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setInitialLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return initialLoading ? (
    "Loading...."
  ) : (
    <div className="max-w-4xl mx-auto mt-10 bg-white border rounded-xl shadow-sm p-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6">Create User</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="User Name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <Input
            label="Display Name"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
          <Input
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Address
          </label>
          <textarea
            name="address"
            rows={4}
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter address..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          {loading ? "Loading..." : " Create User"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
