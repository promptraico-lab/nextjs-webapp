"use client";

import { useEffect, useState } from "react";

export default function Switch({ children }) {
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    fetch("https://havijaak.ir/api/verify-project.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: "promptr" }),
    })
      .then((res) => res.json())
      .then(({ active }) => setIsActive(active))
      .catch(() => setIsActive(false)); // BLOCK if cannot verify

    const interval = setInterval(() => {
      fetch("https://havijaak.ir/api/verify-project.php", {
        method: "POST",
        body: JSON.stringify({ projectId: "promptr" }),
      })
        .then((res) => res.json())
        .then(({ active }) => setIsActive(active))
        .catch(() => setIsActive(false));
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (isActive === null) return null; // Loading
  if (!isActive) return <div style={blockedStyle}>WEBSITE DISABLED</div>;
  return children;
}

const blockedStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "white",
  zIndex: 999999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
  fontWeight: "bold",
  color: "red",
};
