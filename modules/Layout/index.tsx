"use client"
import React, {useEffect} from 'react';
import {inter} from "@/config/fonts";
import {AppShell, Burger, MantineProvider} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import '@mantine/core/styles.css';
import {NavBar} from "@/components/NavBar"

import '@/config/globals.css'
import '@/config/reset.css'
import {Header} from "@/components/Header";
import './Layout.scss'
import useGlobalStore from "@/store/GlobalStore";
import {useRouter} from "next/navigation";
import {Toaster} from "react-hot-toast";
// eslint-disable-next-line @next/next/no-document-import-in-page
import Head from "next/head";
import addNotification from "react-push-notification";

export default function Layout({children}: {children: React.ReactNode}) {
    const [opened, { toggle }] = useDisclosure();
    const {updateHabits, primaryColor, addTime} = useGlobalStore()
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => {
            if((new Date).getMinutes() == 0)
                addNotification({
                    title: "Tracker App",
                    subtitle: "Напоминание",
                    message: "Ты точно не забыл сделать свои задачи?"
                })
        }, 1000 * 60)
        const storage = localStorage.getItem("habits")
        if(storage != null && JSON.parse(storage)["state"].userName == '')
            router.push("/")
        updateHabits()
    }, [router, updateHabits])
    return (
        <html lang="en">
            <title>Трекер привычек</title>
            <Head>
                <link rel="manifest" href="../public/manifest.json"/>
            </Head>
            <body className={inter.className}>
                <Toaster />
                <MantineProvider defaultColorScheme={"dark"} theme={{ primaryColor: primaryColor }}>
                        <AppShell
                            navbar={{
                                width: {md: 300, sm: 200},
                                breakpoint: 'sm',
                                collapsed: { mobile: !opened },
                            }}
                            padding="md"
                        >
                            <AppShell.Navbar p="md">
                                <NavBar toggle={toggle}>
                                    <Burger
                                        opened={opened}
                                        onClick={toggle}
                                        size="sm"
                                        hiddenFrom="sm"
                                    />
                                </NavBar>
                            </AppShell.Navbar>

                            <AppShell.Main>
                                <Header>
                                    <Burger
                                        opened={opened}
                                        onClick={toggle}
                                        size="sm"
                                        hiddenFrom="sm"
                                    />
                                </Header>
                                {children}
                            </AppShell.Main>
                        </AppShell>
                </MantineProvider>
            </body>
        </html>
    )
}