"use client"
import { useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { PropsWithChildren } from "react";
import { redirect, usePathname } from "next/navigation";

export default function Main({ children }: PropsWithChildren) {
    const { isLoading, getUser, isAuth } = useUserStore((state) => state);

    const path = usePathname();

    useEffect(() => {
        if (isLoading) {
            getUser();
        }
    }, []);

    useEffect(() => {
        const protectedRoutes = ['/', '/profile'];

        const currentPathIsProtected = protectedRoutes.includes(path);

        if (!isAuth && currentPathIsProtected) {
            redirect("/login")
        }

        if (isAuth && !currentPathIsProtected) {
            redirect("/")
        }
    }, [isLoading]);

    return <>{children}</>;
}