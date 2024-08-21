import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import addNotification from "react-push-notification";

export const useTimer = (workTime: number) => {
    const [startTime, setStartTime] = useState<Date>(new Date);
    const [time, setTime] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(true);

    const reformatTime = (time: number) => {
        const min = Math.floor(time / 60).toString();
        const sec = Math.floor(time % 60).toString();
        return `${min.length > 1 ? min : `0${min}`}:${sec.length > 1 ? sec : `0${sec}`}`
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;
        const tick = async () => {
            let timeDif = (new Date).getTime() - startTime.getTime();
            let timeDif2 = Math.floor((timeDif % (1000 * 60 * 60)) / 1000) + Math.floor((time % (1000 * 60)) / 1000);
            setTime(timeDif2);
        };
        if(time == workTime) {
            pause()
            setTime(0)
            toast("Время подошло к концу!")
            addNotification({
                title: "Tracker App",
                subtitle: "Таймер",
                message: "Время подошло к концу"
            })
        }
        if (!isPaused) interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [startTime, time, isPaused]);
    const pause = () => {
        if(isPaused) {
            let newStartTime = new Date()
            newStartTime.setTime(newStartTime.getTime() - time * 1000)
            setStartTime(newStartTime)
        }
        setIsPaused(!isPaused);
    };
    const reset = () => {
        setTime(0)
        setStartTime(new Date)
    }
    return { time, pause, isPaused, reset, reformatTime };
};