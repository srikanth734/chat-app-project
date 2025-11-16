import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <button onClick={() => setDark(prev => !prev)} className="px-3 py-1 border rounded">
      {dark ? "Light" : "Dark"}
    </button>
  );
}
