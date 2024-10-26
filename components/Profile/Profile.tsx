import Image from "next/image";
import Ava from "@/assets/images/ava-mock-min.png";
import Edit from "@/assets/icons/edit.svg";
import { useUserStore } from "@/store/user.store";

export default function Wrapper() {
    const { name, surname, grade } = useUserStore((state) => state);

    return (
        <div className="py-10 items-center flex flex-col gap-4">
            <Image src={Ava} priority alt="profile" className="rounded-full h-[150px] w-[150px] object-cover" />
            <div className="flex flex-col gap-1 items-center">
                <h1 className="text-2xl font-bold flex gap-1 items-center">
                    {name} {surname}
                    <button>
                        <Image className="dark:invert" src={Edit} alt='edit' />
                    </button>
                </h1>
                <span className="text-gray-500 text-xs">{grade} грейд</span>
            </div>
        </div>
    )
}