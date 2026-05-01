const Input = ({ label, name, value, onChange, type = "text" }: any) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default Input;
