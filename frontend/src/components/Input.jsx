import React from "react";

function Input({ accept, type = "text", onChangeInput, placeholder, label, id, inputValue, name }) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-xs font-black uppercase tracking-widest text-zinc-500 px-1">
          {label}
        </label>
      )}
      <input
        accept={accept}
        name={name}
        value={inputValue}
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChangeInput}
        className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl px-5 py-3.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all backdrop-blur-md"
      />
    </div>
  );
}

export default Input;