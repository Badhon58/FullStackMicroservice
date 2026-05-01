"use client";
import React, { useState } from "react";
import Input from "../Common/Input";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/lib/config";
import { useRouter } from "next/navigation";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productDisplayName: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    stock: "",
    isActive: true,
    discount: "",
    rating: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await apiCall(
        Methods.POST,
        EndPoint.CREATE_NEW_PRODUCT,
        formData,
      );
      if (response.success) {
        setMessage("Product Created Successful");
        router.push("/product");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white border rounded-xl shadow-sm p-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
          <Input
            label="Display Name"
            name="productDisplayName"
            value={formData.productDisplayName}
            onChange={handleChange}
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <Input
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
          <Input
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
          <Input
            label="Discount (%)"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
          />
          <Input
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write product description..."
          />
        </div>

        {/* Active Checkbox */}
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Active Product
        </label>
        {message.length > 0 && <p className="text-green-300">{message}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          {loading ? "Loading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default Create;

/* Reusable Input Component */
