import "./Countdown.css"
import {useEffect, useState} from "react";

interface CountdownProps {
    targetDate: string;
}

interface TimeRemaining{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeRemaining(targetDate: string): TimeRemaining{
    const difference = new Date(targetDate).getTime() - Date.now();
    const totalSeconds = Math.max(0, Math.floor(difference / 1000));

    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: Math.floor(totalSeconds % 60),
    }
}

export default function Countdown({ targetDate }: CountdownProps) {
    const [timeRemaining, setTimeRemaining] = useState(() => calculateTimeRemaining(targetDate));

    useEffect(() => {

        const updateCountdown = () => {
            setTimeRemaining(calculateTimeRemaining(targetDate));
        }

        updateCountdown();

        const intervalid = setInterval(updateCountdown, 1000);

        return () =>clearInterval(intervalid);
    },[targetDate]);

    return (
        <div className={"countdown"}>
            <div className={"countdown__unit"}>
                <span className={"countdown__value"}>{timeRemaining.days}</span>
                <span className={"countdown__label"}>Dagen</span>
            </div>
            <span className={"countdown__divider"}>:</span>
            <div className={"countdown__unit"}>
                <span className={"countdown__value"}>
                    {String(timeRemaining.hours).padStart(2, "0")}
                </span>
                <span className={"countdown__label"}>Uur</span>
            </div>
            <span className={"countdown__divider"}>:</span>
            <div className={"countdown__unit"}>
                <span className={"countdown__value"}>
                    {String(timeRemaining.minutes).padStart(2, "0")}
                </span>
                <span className={"countdown__label"}>Min</span>
            </div>
            <span className={"countdown__divider"}>:</span>
            <div className={"countdown__unit"}>
                <span className={"countdown__value"}>
                    {String(timeRemaining.seconds).padStart(2, "0")}
                </span>
                <span className={"countdown__label"}>Sec</span>
            </div>
        </div>
    )
}