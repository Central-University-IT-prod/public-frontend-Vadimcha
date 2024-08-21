"use client"
import React, {useEffect, useState} from 'react';
import {Anchor, Avatar, Divider, Flex, Group, Text} from "@mantine/core";
import styles from './Header.module.scss'
import {NavLinks} from "@/components/NavBar/NavLinks";
import useGlobalStore from "@/store/GlobalStore";

export const Header = ({ children }: {children: React.ReactNode}) => {
    const {avatar, userName} = useGlobalStore()
    const [label, setLabel] = useState<string>()
    useEffect(() => {
        const checkLabel = async () => {
            const ind = NavLinks.findIndex(item => item.src == window.location.pathname)
            setLabel(ind != -1 ? NavLinks[ind].label : 'Ошибка')
        }
        checkLabel().then()
    }, [])
    return (
        <div>
            <Flex
                direction={"row"}
                align={"center"}
                justify={"space-between"}
            >
                {children}
                <h2 className={styles.title}>
                    { label }
                </h2>
                <Anchor href={"/profile"}>
                    <Avatar
                        src={avatar ? avatar : "/Avatar.jpg"}
                        radius={"xl"}
                        size={"30"}
                        alt={"Avatar"}
                    />
                </Anchor>
            </Flex>
            <Divider my="md" />
        </div>
    )
}