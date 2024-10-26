"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/SignupForm/SignupForm";
import { Preloader } from "@/components/Preloader/Preloader";

export default function Signup() {

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
    <SignupForm />
  )
}