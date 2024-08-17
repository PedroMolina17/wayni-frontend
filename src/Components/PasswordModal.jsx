import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
const PasswordModal = ({
  isOpen,
  onClose,
  onSave,
  data,
  passwordValue,
  onPasswordChange,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorCurrentPassword, setErrorCurrentPassword] = useState(false);
  const [errorMatchPassword, setErrorMatchPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState({
    hasUppercase: false,
    lengthValid: false,
  });

  useEffect(() => {
    if (!isOpen) {
      setCurrentPassword("");
      setConfirmPassword("");
      setErrorCurrentPassword(false);
      setErrorMatchPassword("");
      setPasswordError("");
      setPasswordSuccess({
        hasUppercase: false,
        lengthValid: false,
      });
    }
  }, [isOpen]);

  const validatePassword = (password) => {
    const minLength = 6;
    const maxLength = 18;
    const hasUppercase = /[A-Z]/.test(password);
    const lengthValid =
      password.length >= minLength && password.length <= maxLength;

    return {
      hasUppercase,
      lengthValid,
    };
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    onPasswordChange(e);
    const validation = validatePassword(password);
    setPasswordSuccess({
      hasUppercase: validation.hasUppercase,
      lengthValid: validation.lengthValid,
    });

    if (!validation.hasUppercase) {
      setPasswordError("Password must include at least one uppercase letter.");
    } else if (!validation.lengthValid) {
      setPasswordError(`Password must be between 6 and 18 characters.`);
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);

    if (passwordValue !== password) {
      setErrorMatchPassword("Passwords do not match.");
    } else {
      setErrorMatchPassword("");
    }
  };

  const handleSave = () => {
    if (currentPassword !== data) {
      setErrorCurrentPassword(true);
      return;
    }

    if (passwordValue !== confirmPassword) {
      setErrorMatchPassword("Passwords do not match.");
      return;
    }

    if (passwordError) {
      setErrorMatchPassword(passwordError);
      return;
    }

    onSave();
    setCurrentPassword("");
    setConfirmPassword("");
    setErrorMatchPassword("");
    setPasswordError("");
    setPasswordSuccess({
      hasUppercase: false,
      lengthValid: false,
    });
    setErrorCurrentPassword(false);
    onClose();
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
        {errorCurrentPassword && (
          <p className="text-red-500 text-xs mt-2">
            Current password is incorrect.
          </p>
        )}
        <label className="flex flex-col gap-3 mt-4">
          <p className="text-xs">New Password</p>
          <input
            type="password"
            value={passwordValue}
            onChange={handlePasswordChange}
            className="border border-gray-300 p-2 w-full"
          />
          {passwordError && (
            <p className="text-red-500 text-xs">{passwordError}</p>
          )}
          {passwordSuccess.hasUppercase && (
            <p className="text-green-600 text-xs flex items-center gap-1">
              <FaCheckCircle />
              <span>Password contains at least one uppercase letter.</span>
            </p>
          )}
          {passwordSuccess.lengthValid && (
            <p className="text-green-600 text-xs flex items-center gap-1">
              <FaCheckCircle />
              <span>Password length is valid (6-18 characters).</span>
            </p>
          )}
        </label>
        <label className="flex flex-col gap-3 mt-4">
          <p className="text-xs">Confirm New Password</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="border border-gray-300 p-2 w-full"
          />
          {errorMatchPassword && (
            <p className="text-red-500 text-xs mt-2">{errorMatchPassword}</p>
          )}
        </label>
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
