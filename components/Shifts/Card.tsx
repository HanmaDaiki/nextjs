import { Shift } from "../Content/Content";

export default function Card(props: Shift) {
    return (
        <div className="flex flex-col gap-1 w-full p-4 border rounded-xl border-gray-200">
            <h1>Дата: {props.date}</h1>
            <span>Прибыль: {props.profit}</span>
            <span>Чай: {props.tips}</span>
            <span>Процент чая от прибыли: {props.tips_percent}%</span>
            <span>Зарплата: {props.sum_salary}</span>
        </div>
    )
}