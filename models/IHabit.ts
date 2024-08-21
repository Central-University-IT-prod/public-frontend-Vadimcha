export interface IHabit {
    createdAt: Date,
    updatedAt: Date,
    id: number,
    name: string,
    type: string,
    category?: string,
    progress: number,
    maxProgress: number,
}