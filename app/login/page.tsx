"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { Preloader } from "@/components/Preloader/Preloader";

export default function Login() {
  const { getUser, isAuth, isLoading } = useUserStore((state) => state);

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    if (isAuth) {
      redirect("/");
    }
  }, [isAuth]);

  if (isLoading) {
    return <Preloader />
  }

  return (
    <LoginForm />
  )
}