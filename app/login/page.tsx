"use client";
import { useUserStore } from "@/store/user.store";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { Preloader } from "@/components/Preloader/Preloader";
import { Main } from "@/components/Main";

export default function LoginPage() {
  const { isLoading } = useUserStore((state) => state);

  return (
    <Main>
      {
        isLoading ? <Preloader /> : <LoginForm />
      }
    </Main>
  )
}