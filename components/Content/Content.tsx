"use client";

import { useState } from "react";
import { Profile } from "@/components/Profile";
import { Shifts } from "@/components/Shifts";
import { Header } from "@/components/Header";

export type Shift = {
    id: number;
    date: string;
    profit: number;
    tips: number;
    tips_percent: number;
    salary: number;
    sum_salary: number;
}



export default function Content() {
    const [tab, setTab] = useState<"shifts" | "statistics">("shifts");

    const mockShifts: Shift[] = [
        {
            id: 1,
            date: "23.10.2024",
            profit: 94231,
            tips: 6230,
            tips_percent: 6.61,
            salary: 1000,
            sum_salary: 1942,
        },
        {
            id: 2,
            date: "24.10.2024",
            profit: 87650,
            tips: 5890,
            tips_percent: 6.72,
            salary: 1000,
            sum_salary: 1876,
        },
        {
            id: 3,
            date: "25.10.2024",
            profit: 102340,
            tips: 7150,
            tips_percent: 6.98,
            salary: 1000,
            sum_salary: 2023,
        },
        {
            id: 4,
            date: "26.10.2024",
            profit: 91780,
            tips: 5980,
            tips_percent: 6.51,
            salary: 1000,
            sum_salary: 1918,
        },
        {
            id: 5,
            date: "27.10.2024",
            profit: 98450,
            tips: 6780,
            tips_percent: 6.89,
            salary: 1000,
            sum_salary: 1985,
        },
        {
            id: 6,
            date: "28.10.2024",
            profit: 88920,
            tips: 5940,
            tips_percent: 6.68,
            salary: 1000,
            sum_salary: 1889,
        },
    ];

    const handleChangeTab = (tab: "shifts" | "statistics") => {
        setTab(tab);
    };

    return (
        <>
            <Header />
            <Profile />
            <ul className="flex gap-4 p-5">
                <li><button onClick={() => handleChangeTab("shifts")} className={`${tab === 'shifts' ? 'text-blue-500' : 'text-gray-500'}`}>Смены</button></li>
                <li><button onClick={() => handleChangeTab("statistics")} className={`${tab === 'statistics' ? 'text-blue-500' : 'text-gray-500'}`}>Статистика</button></li>
            </ul>

            {tab === "shifts" && <Shifts shifts={mockShifts} />}
            {tab === "statistics" && <div className="flex flex-col gap-2">
                <span>Всего смен в месяце: {mockShifts.length}</span>
                <span>Всего заработано: {mockShifts.reduce((acc, shift) => acc + shift.sum_salary + shift.tips, 0)}</span>
            </div>}
        </>
    );
}