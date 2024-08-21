export interface ILibrary {
    category: string,
    items: ILibraryItem[]
}

export interface ILibraryItem {
    name: string,
    maxProgress: number,
    type: string,
    category?: string,
}