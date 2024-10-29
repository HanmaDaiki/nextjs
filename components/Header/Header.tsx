"use client";
import { useUserStore } from "@/store/user.store";
import { redirect } from "next/navigation";
import Profile from "@/assets/icons/profile.svg";
import Exit from "@/assets/icons/exit.svg";

export default function Header() {
    const { isAuth, logout, getUser } = useUserStore((store) => store);

    const handleLogout = async () => {
        await logout();
        await getUser();
    };

    const redirectToProfile = () => {
        redirect("/profile");
    };

    const redirectToMain = () => {
        redirect("/");
    };

    if (!isAuth) {
        return <></>;
    }

    return (
        <div className="flex justify-between items-center w-screen h-100 sticky top-0 left-0 p-2 gap-2">
            <button className="bg-blue-500 p-2 text-sm rounded-full" onClick={redirectToMain}>Главная страница</button>
            <div className="flex gap-2">
                <button className="bg-green-500 p-2 rounded-full" onClick={redirectToProfile}><Profile width={20} height={20} /></button>
                <button className="bg-red-500 p-2 rounded-full" onClick={handleLogout}><Exit width={20} height={20} /></button>
            </div>
        </div>
    );
}