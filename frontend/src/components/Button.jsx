import React from "react";

function Button({ text = "Submit", onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-purple-500/10 hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 tracking-tight"
    >
      {text}
    </button>
  );
}

export default Button;