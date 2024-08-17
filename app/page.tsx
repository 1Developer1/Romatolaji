"use client";
import { useRouter } from "next/navigation";
import { Errorful, Successful } from "@/toolkit/toaster";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { useEffect, useState } from "react";
export default function Home() {
  const [sayi, setSayi] = useState(0);
  if (sayi == 5) {
  }

  const router = useRouter();
  // router.push("login/");

  return (
    <main>
      <ToastContainer />
    </main>
  );
}
