import { useUserStore } from "@/store/user.store";
import { useState } from "react";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const getUser = useUserStore((state) => state.getUser);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL && 'http://localhost:3000/'}api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      })
    })

    getUser();
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">РЕГИСТРАЦИЯ</h1>

      <label className="flex flex-col gap-[2px]">
        Имя
        <input onChange={handleChangeName} type="text" id="name" className="border-2 border-gray-500 bg-transparent rounded-md p-2" />
      </label>

      <label className="flex flex-col gap-[2px]">
        Фамилия
        <input onChange={handleChangeSurname} type="text" id="surname" className="border-2 border-gray-500 bg-transparent rounded-md p-2" />
      </label>

      <label className="flex flex-col gap-[2px]">
        Почта
        <input onChange={handleChangeEmail} type="text" id="email" className="border-2 border-gray-500 bg-transparent rounded-md p-2" />
      </label>

      <label className="flex flex-col gap-[2px]">
        Пароль
        <input onChange={handleChangePassword} type="password" id="password" className="border-2 border-gray-500 bg-transparent rounded-md p-2" />
      </label>
      <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Зарегистрироваться</button>

      <span className="text-center">Уже есть аккаунт? <a href="/login" className="text-blue-500">Войти</a></span>
    </form>
  )
}