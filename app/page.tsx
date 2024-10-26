"use client";
import { Content } from "@/components/Content";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { Preloader } from "@/components/Preloader/Preloader";

export default function Home() {
  const { getUser, isAuth, isLoading } = useUserStore((state) => state);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      redirect("/login");
    }
  }, [isAuth]);

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="flex justify-center items-center flex-col px-2">
      <Content />
    </div>
  );
}
