import {IAchivment} from "@/models/IAchivment";
import {IHistoryItem} from "@/models/IHistoryItem";

export const AchivmentData: IAchivment[] = [
    {
        completed: false,
        icon: '😀',
        name: 'Выполнить 1 задачу',
        condition: (history: IHistoryItem[]) => {
            return history.filter(item => item.updatedProgress == item.maxProgress).length >= 1
        },
    },
    {
        completed: false,
        icon: '😋',
        name: 'Выполнить 3 задачи',
        condition: (history: IHistoryItem[]) => {
            return history.filter(item => item.updatedProgress == item.maxProgress).length >= 3
        },
    },
    {
        completed: false,
        icon: '😝',
        name: 'Выполнить 5 задач',
        condition: (history: IHistoryItem[]) => {
            return history.filter(item => item.updatedProgress == item.maxProgress).length >= 5
        },
    },
    {
        completed: false,
        icon: '😜',
        name: 'Выполнить 10+ задач',
        condition: (history: IHistoryItem[]) => {
            return history.filter(item => item.updatedProgress == item.maxProgress).length >= 10
        },
    },
    {
        completed: false,
        icon: '🐥',
        name: '5 задач в 6:00-11:00',
        condition: (history: IHistoryItem[]) => {
            return history.filter(item => {
                const date = new Date(item.time)
                return item.updatedProgress == item.maxProgress &&
                    date.getHours() >= 6 && date.getHours() <= 10
            }).length >= 5
        },
    },
    {
        completed: false,
        icon: '🐨',
        name: '5 задач в 11:00-16:00',
        condition: (history: IHistoryItem[]) => {
            return history.filter(item => {
                const date = new Date(item.time)
                return item.updatedProgress == item.maxProgress &&
                    date.getHours() >= 11 && date.getHours() <= 15
            }).length >= 5
        },
    },
    {
        completed: false,
        icon: '🐰',
        name: '5 задач в 16:00-21:00',
        condition: (history: IHistoryItem[]) => {
            return history.filter(item => {
                const date = new Date(item.time)
                return item.updatedProgress == item.maxProgress &&
                    date.getHours() >= 16 && date.getHours() <= 20
            }).length >= 5
        },
    },
    {
        completed: false,
        icon: '🦊',
        name: '5 задач в 21:00-6:00',
        condition: (history: IHistoryItem[]) => {
            return history.filter(item => {
                const date = new Date(item.time)
                return item.updatedProgress == item.maxProgress &&
                    ((date.getHours() >= 21 && date.getHours() <= 23) ||
                        (date.getHours() >= 0 && date.getHours() <= 5))
            }).length >= 5
        },
    },
]