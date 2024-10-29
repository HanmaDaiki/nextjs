"use client"
import { Main } from "@/components/Main";
import { Preloader } from "@/components/Preloader/Preloader";
import { Profile } from "@/components/Profile";
import { useUserStore } from "@/store/user.store";

export default function ProfilePage() {
    const { isLoading } = useUserStore();

    return (
        <Main>
            {isLoading ? <Preloader /> :
                <>
                    <Profile />
                </>
            }
        </Main>
    );
}