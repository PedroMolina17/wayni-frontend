import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";

const EditModal = ({
  isOpen,
  onClose,
  value,
  onChange,
  onSave,
  title,
  inputProps,
}) => {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const handleSave = () => {
    if (title === "Email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrorEmail(true);
      return;
    } else {
      setErrorEmail(false);
    }

    if (title === "Phone Number" && !/^\d+$/.test(value)) {
      setErrorPhoneNumber(true);
      return;
    } else {
      setErrorPhoneNumber(false);
    }

    onSave();
  };

  const handleClose = () => {
    setErrorEmail(false);
    setErrorPhoneNumber(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#f6fbff] flex flex-col z-50">
      <div className="fixed top-0 left-0 right-0 h-16 bg-white p-4">
        <h2 className="text-lg font-bold text-center">{title}</h2>
        <div className="fixed top-0 left-0 flex justify-center items-center h-16 p-2 text-xl">
          <FaArrowLeft onClick={handleClose} />
        </div>
      </div>
      <div className="p-4 rounded flex flex-col pt-20">
        <label className="flex flex-col gap-3">
          <p className="text-xs">{title}</p>
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="border border-gray-300 p-2 w-full"
            {...inputProps}
          />
          {errorEmail && title === "Email" && (
            <p className="text-red-500 text-xs">Invalid email</p>
          )}
          {errorPhoneNumber && title === "Phone Number" && (
            <p className="text-red-500 text-xs">Invalid phone number</p>
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

export default EditModal;
