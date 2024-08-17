import { FaArrowRight } from "react-icons/fa";

const Input = ({ title, data }) => {
  return (
    <button className="flex justify-between items-center border p-4 w-96">
      <div className="flex flex-col items-center justify-center">
        <div>{title}</div>
        <p className="text-start w-full"> {data}</p>
      </div>
      <FaArrowRight></FaArrowRight>
    </button>
  );
};

export default Input;
