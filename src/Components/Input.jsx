import { IoIosArrowForward } from "react-icons/io";

const Input = ({ title, data }) => {
  return (
    <button className="flex justify-between items-center border  border-[#e3f3fc] p-4 w-full bg-white">
      <div className="flex flex-col  justify-center">
        <div className="text-start font-bold ">{title}</div>
        <p className="text-start w-full"> {data}</p>
      </div>
      <IoIosArrowForward></IoIosArrowForward>
    </button>
  );
};

export default Input;
