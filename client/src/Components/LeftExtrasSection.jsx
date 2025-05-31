import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Package } from "lucide-react"; // Optional icon if using lucide-react

const LeftExtrasSection = ({ extras, toggleExtra }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <Package className="w-6 h-6 text-orange-500" /> Extra Opțiuni
    </h2>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
      {extras.map((extra, index) => (
        <div
          key={index}
          className={`relative p-5 rounded-xl shadow-sm border transition-all duration-200 ${
            extra.selected ? 'bg-green-50 border-green-400' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">{extra.name}</p>
              <p className="text-sm text-gray-500">€{extra.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => toggleExtra(index)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                extra.selected 
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-amber-500 text-white hover:bg-amber-600'
              }`}
            >
              {extra.selected ? "Remove" : "Add"}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LeftExtrasSection;
