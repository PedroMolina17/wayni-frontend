import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const PasswordModal = ({ isOpen, onClose, onSave }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      onSave();
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#f6fbff] flex flex-col z-50">
      <div className="fixed top-0 left-0 right-0 h-16 bg-white p-4">
        <h2 className="text-lg font-bold text-center">Change Password</h2>
        <div className="fixed top-0 left-0 flex justify-center items-center h-16 p-2 text-xl">
          <button onClick={onClose} className="text-xl">
            <FaArrowLeft />
          </button>
        </div>
      </div>
      <div className="p-4 rounded flex flex-col pt-20">
        <label className="flex flex-col gap-3">
          <p className="text-xs">Current Password</p>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          />
        </label>
        <label className="flex flex-col gap-3 mt-4">
          <p className="text-xs">New Password</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          />
        </label>
        <label className="flex flex-col gap-3 mt-4">
          <p className="text-xs">Confirm New Password</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          />
        </label>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#bbe982] text-black px-4 py-2 rounded-xl flex w-full justify-center items-center"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
