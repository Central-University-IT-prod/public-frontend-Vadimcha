import {IShopItem} from "@/models/IShopItem";

export interface IShop {
    [key: string]: IShopItem;
}

export const ShopData: IShop = {
    'changeImg': {
        id: 'changeImg',
        name: "Возможность изменить автарку и никнейм",
        price: 7,
        purchased: false,
    },
    'changePrimaryColor': {
        id: 'changePrimaryColor',
        name: "Возможность изменить цвет интерфейса",
        price: 10,
        purchased: false,
    },
    'timer': {
        id: 'timer',
        name: "Таймер для сосредоточения",
        price: 5,
        purchased: false,
    },
}

export const ShopItemsIds = ['changeImg',  'changePrimaryColor', 'timer']