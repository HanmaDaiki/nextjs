"use client";
import { useUserStore } from "@/store/user.store";
import { SignupForm } from "@/components/SignupForm/SignupForm";
import { Preloader } from "@/components/Preloader/Preloader";
import { Main } from "@/components/Main";

export default function SignupPage() {
  const { isLoading } = useUserStore((state) => state);

  return (
    <Main>{isLoading ? <Preloader /> : <SignupForm />}</Main>

  )
}