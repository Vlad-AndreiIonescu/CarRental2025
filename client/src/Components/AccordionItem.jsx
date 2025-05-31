import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <FaChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
};

export default AccordionItem;
