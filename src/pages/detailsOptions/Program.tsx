import "./Program.css"
import type {ComponentType, SVGProps} from "react";

export interface PlanningItem {
    time: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    description: string;
}

interface ProgramProps{
    planningItems: PlanningItem[];
}

export default function Program({ planningItems }: ProgramProps) {
    return (
        <div className={"program"}>
                <h3>Programma</h3>

            <div className={"program__schedule"}>
                {planningItems.map((item) =>  {
                    const Icon  = item.icon;
                    return (
                    <div key={item.time}
                        className={"program__item"}>
                        <div className={"program__item-time"}>
                            {item.time}
                        </div>

                        <div className={"program__item-description"}>
                            <Icon className={"program__item-icon"}/>
                            <p>{item.description}</p>
                        </div>

                    </div>
                );})
                }

            </div>
        </div>
    )
}