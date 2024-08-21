import {IHistoryItem} from "@/models/IHistoryItem";

export interface IAchivment {
    completed: boolean,
    name: string,
    icon: string,
    condition: (history: IHistoryItem[]) => boolean,
}