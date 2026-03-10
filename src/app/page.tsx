"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/src/components/LoginForm";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleEnter = () => {
    if (!username.trim()) return;
    localStorage.setItem("codeleap_username", username.trim());
    router.push("/feed");
  };

  return (
    <LoginForm
      username={username}
      onChange={setUsername}
      onEnter={handleEnter}
    />
  );
}