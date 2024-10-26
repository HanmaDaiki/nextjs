import { Shift } from "../Content/Content";
import Card from "./Card";

export default function Shifts(props: { shifts: Shift[] }) {
    return (
        <div className="w-full flex flex-col gap-4">
            {
                props.shifts.map((shift) => (
                    <Card key={shift.id} {...shift} />
                ))
            }
        </div>
    );
}