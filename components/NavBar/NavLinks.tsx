import React from "react";
import {IconAlignLeft, IconBuildingStore, IconHourglassEmpty, IconLibrary, IconUser} from "@tabler/icons-react";

export interface INavLink {
    label: string,
    icon?: React.ReactNode,
    src: string,
    navLink: boolean,
}

export const NavLinks = [
    {
        label: "Привет 👋",
        src: "/",
        navLink: false,
    },
    {
        label: "Профиль",
        icon: <IconUser stroke={2} size={20} />,
        src: "/profile",
        navLink: true,
    },
    {
        label: "Привычки",
        icon: <IconAlignLeft stroke={2} size={20} />,
        src: "/habits",
        navLink: true,
    },
    {
        label: "Библиотека",
        icon: <IconLibrary stroke={2} size={20} />,
        src: "/library",
        navLink: true,
    },
    {
        label: "Таймер",
        icon: <IconHourglassEmpty stroke={2} size={20} />,
        src: "/timer",
        navLink: true,
    },
    {
        label: "Магазин",
        icon: <IconBuildingStore stroke={2} size={20} />,
        src: "/shop",
        navLink: true,
    },
] as INavLink[]