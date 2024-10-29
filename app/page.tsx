"use client";
import { Content } from "@/components/Content";
import { useUserStore } from "@/store/user.store";
import { Preloader } from "@/components/Preloader/Preloader";
import { Main } from "@/components/Main";

export default function Home() {
  const { isLoading } = useUserStore((state) => state);

  return (
    <Main>
      {
        isLoading ? <Preloader /> :
          <div className="flex justify-center items-center flex-col px-2">
            <Content />
          </div>
      }
    </Main>
  );
}
