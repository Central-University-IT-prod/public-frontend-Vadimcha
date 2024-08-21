import {create} from "zustand";
import {mountStoreDevtool} from "simple-zustand-devtools";
import {persist} from "zustand/middleware";
import {IHabit} from "@/models/IHabit";
import {IHistoryItem} from "@/models/IHistoryItem";
import {IAchivment} from "@/models/IAchivment";
import {IDayStat} from "@/models/IDayStat";
import {formatDate} from "@/utils/FormatDateToChartType";
import {ITimeStat} from "@/models/ITimeStat";
import {ILibrary, ILibraryItem} from "@/models/ILibrary";
import toast from "react-hot-toast";
import {AchivmentData} from "@/data/AchivmentData";
import {IShopItem} from "@/models/IShopItem";
import {IShop, ShopData} from "@/data/ShopData";

interface GlobalStore {
    userName: string,
    avatar: string | null,
    money: number, // 🪙
    primaryColor: string,
    shop: IShop,

    habits: IHabit[],
    library: ILibrary[],
    history: IHistoryItem[],
    achivments: IAchivment[],
    dayStats: IDayStat[],
    timeStats: ITimeStat[],
    addTime: number,

    getNewId: () => Number,
    addNewHabit: (habit: IHabit) => void,
    deleteHabits: (ids: Number[], save: boolean) => void,
    changeHabitProgress: (id: number, progress: number, changeDate?: Date) => void,
    getDayStats: () => void,
    getTimeStats: () => void,
    deleteFromLibrary: (item: ILibraryItem) => void,
    changeUserMeta: (values: { name: string, urlImg?: string }) => void,
    setAddTime: (time: string) => void,

    updateHabits: () => void,
    checkAchivments: () => void,
    setPrimaryColor: (color: string) => void,
    buyItem: (item: IShopItem) => void,
}

const useGlobalStore = create<GlobalStore>()(
    persist(
        (set, get) => ({
            userName: '',
            avatar: null,
            money: 0,
            primaryColor: "blue",
            shop: ShopData,

            habits: [],
            library: [],
            history: [],
            achivments: AchivmentData,
            dayStats: [],
            timeStats: [],

            addTime: 0,

            getNewId: () => { return ((
                    get().habits.length == 0 ?
                    0 :
                    Math.max(...get().habits.map(habit => habit.id)))
                + 1) },
            addNewHabit: (habit: IHabit) => {
                let processedCategory = habit.category ? habit.category : 'Без категории'
                let library = get().library
                let foundInd = library.findIndex(item => item.category == processedCategory)
                if(foundInd != -1 && library[foundInd].items.findIndex(item => item.name == habit.name) == -1) {
                    library[foundInd].items.push({
                        name: habit.name,
                        maxProgress: habit.maxProgress,
                        type: habit.type,
                        category: processedCategory,
                    })
                }
                else if(foundInd == -1)
                    library.push({
                    category: processedCategory,
                    items: [{
                        name: habit.name,
                        maxProgress: habit.maxProgress,
                        type: habit.type,
                        category: processedCategory
                    }]
                })
                set({ habits: [...get().habits, habit], library: library})
            },
            deleteHabits: (ids: Number[], save: boolean) => {
                let copy = get().habits.filter((item) => !(ids.includes(item.id)))
                let history = get().history
                if(!save)
                    history = history.filter(item => !(ids.includes(item.id)))
                set({ habits: copy, history: history })
            },
            changeHabitProgress: (id: Number, new_progress: Number, changeDate?: Date) => {
                let foundInd = get().habits.findIndex(habit => habit.id == id)
                let copy = get().habits, habit = copy[foundInd], recentProgress = habit.progress
                let date = changeDate ? changeDate : new Date()
                if(!changeDate) date.setTime(date.getTime() + get().addTime)
                if(copy[foundInd].maxProgress == new_progress) {
                    toast.success('Вы достигли цели! (1🪙)', {
                        position: "bottom-right"
                    })
                    set({ money: get().money + 1 })
                }
                if(copy[foundInd].progress == copy[foundInd].maxProgress && new_progress != copy[foundInd].maxProgress) {
                    toast.error('Что-то тут не чисто! (-1🪙)', {
                        position: "bottom-right"
                    })
                    set({ money: Math.max(get().money - 1, 0) })
                }
                copy[foundInd].progress = new_progress as number;
                set({ habits: copy, history: [...get().history, {
                        id: habit.id,
                        recentProgress: recentProgress,
                        updatedProgress: new_progress as number,
                        maxProgress: habit.maxProgress,
                        time: date,
                    }] })
            },
            getDayStats: () => {
                const stats = [] as IDayStat[]
                for(let i = 7; i > -1; --i) {
                    let date = new Date()
                    date.setTime(date.getTime() + get().addTime)
                    date.setDate(date.getDate() - i)
                    const history = get().history.filter(item => {
                        const A = new Date(item.time)
                        return A.getDate() == date.getDate()
                    })
                    let unique = new Set(history.map(item => item.id)), uniqueArr = Array.from(unique);
                    let quantity = 0;
                    for(let j = 0; j < uniqueArr.length; ++j) {
                        const historyItem = history.findLast(obj => obj.id == Number(uniqueArr[j]))
                        if(historyItem) {
                            quantity += (
                                historyItem.updatedProgress === historyItem.maxProgress ? 1 : 0
                            )
                        }
                    }
                    const processedDate = formatDate(date)
                    stats.push({
                        date: processedDate,
                        maxValue: Math.max(quantity, 10),
                        quantity: quantity
                    })
                }
                set({ dayStats: stats })
            },
            getTimeStats: () => {
                const stats = [] as ITimeStat[]
                for(let j = 0; j < 24; ++j)
                    stats.push({
                        date: `${j < 10 ? `0${j}:00` : `${j}:00`}`,
                        quantity: 0,
                    })
                for(let i = 7; i > -1; --i) {
                    let date = new Date()
                    date.setTime(date.getTime() + get().addTime)
                    date.setDate(date.getDate() - i)
                    const history = get().history.filter(item => {
                        const A = new Date(item.time)
                        return A.getDate() == date.getDate()
                    })
                    for(let j = 0; j < 23; ++j) {
                        const quantity = history.filter((item) => {
                            let curDate = new Date(item.time), curHour = curDate.getHours()
                            return curHour == j
                        }).length;
                        stats[j].quantity += quantity
                    }
                }
                set({ timeStats: stats })
            },
            updateHabits: () => {
                let date = new Date()
                date.setTime(date.getTime() + get().addTime)
                let habits = get().habits
                for(let i = 0; i < habits.length; ++i) {
                    const updatedAt = new Date(habits[i].updatedAt)
                    if(habits[i].type == "Ежедневная"  && (date.setHours(0,0,0,0) - updatedAt.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24) >= 1) {
                        habits[i].progress = 0
                        habits[i].updatedAt = date
                    }
                    if(habits[i].type == "Еженедельная" && (date.setHours(0,0,0,0) - updatedAt.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24) >= 7) {
                        habits[i].progress = 0
                        habits[i].updatedAt = date
                    }
                    if(habits[i].type == "Ежемесячная"&& (date.setHours(0,0,0,0) - updatedAt.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24) >= 30) {
                        habits[i].progress = 0
                        habits[i].updatedAt = date
                    }
                }
            },
            deleteFromLibrary: (item: ILibraryItem) => {
                let library = get().library
                let indOfLibrary = library.findIndex(ILibraryCategory => ILibraryCategory.category == item.category);
                if(indOfLibrary != -1)
                    library[indOfLibrary].items= library[indOfLibrary].items.filter(libraryItem => libraryItem != item)
                toast.success('Привычка удалена из библиотеки', {
                    position: "bottom-right"
                })
                set({ library: library })
            },
            changeUserMeta: (values: { name: string, urlImg?: string }) => {
                if(values.urlImg)
                    set({ userName: values.name, avatar: values.urlImg })
                else if(get().userName != values.name)
                    set({ userName: values.name })
            },
            checkAchivments: () => {
                let achivments = get().achivments, history = get().history
                for(let i = 0; i < achivments.length; ++i) {
                    let findInd = AchivmentData.find(item => item.name == achivments[i].name)
                    if(findInd) {
                        const completed = findInd.condition(history)
                        if(completed && !achivments[i].completed) {
                            toast(`Выполнено достижение: "${achivments[i].name}" (3🪙)`, {
                                position: "bottom-right",
                                icon: achivments[i].icon
                            })
                            set({ money: get().money + 3 })
                        }
                        if(!achivments[i].completed) achivments[i].completed = findInd.condition(history);
                    }
                }
                set({ achivments: achivments })
            },
            setAddTime: (time: string) => {
                const date = time.split('.')
                const newToday = new Date(
                    Number(date[2]),
                    Number(date[1]) - 1,
                    Number(date[0]),
                    (new Date).getHours(),
                    (new Date).getMinutes(),
                    (new Date).getSeconds(),
                    (new Date).getMilliseconds()
                )
                set({ addTime: (newToday.getTime()) - (new Date).getTime() })
            },
            setPrimaryColor: (color: string) => {
                set({ primaryColor: color })
            },
            buyItem: (item: IShopItem) => {
                let shop = get().shop
                shop[item.id].purchased = true;
                set({ shop: shop, money: get().money - shop[item.id].price })
                toast.success('Успешно куплено!', {
                    position: "bottom-right"
                })
            }
        }),
        {
            name: 'habits',
        },
    ),
)

mountStoreDevtool('Store', useGlobalStore);
export default useGlobalStore;