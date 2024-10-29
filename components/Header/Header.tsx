import { useUserStore } from "@/store/user.store";

export default function Header() {
    const { logout, getUser } = useUserStore((store) => store);

    const handleLogout = async () => {
        await logout();
        await getUser();
    };

    return (
        <div className="flex justify-end items-center w-screen dark:bg-[#0a0a0a] bg-[#ffffff] h-100 sticky top-0 left-0 p-2 gap-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">Редактировать</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleLogout}>Выход</button>
        </div>
    );
}