import { config } from "@/config";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getUser = useUserStore((state) => state.getUser);

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch(`${config.apiURL}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            })
        }).then(res => {
            if (res.ok) {
                getUser();
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-center">ВХОД</h1>

            <label className="flex flex-col gap-[2px]">
                Почта
                <input onChange={handleChangeEmail} type="text" id="email" className="border-2 border-gray-500 bg-transparent rounded-md p-2" />
            </label>
            <label className="flex flex-col gap-[2px]">
                Пароль
                <input onChange={handleChangePassword} type="password" id="password" className="border-2 border-gray-500 bg-transparent rounded-md p-2" />
            </label>
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Войти</button>

            <span className="text-center">Нет аккаунта? <a href="/signup" className="text-blue-500">Зарегистрироваться</a></span>
        </form>
    )
}