'use client'
import React, {useEffect} from 'react';
import {DayStatsChart} from "@/components/DayStatsChart";
import styles from './ProfilePage.module.scss'
import {TimeStatsChart} from "@/components/TimeStatsChart";
import {AspectRatio, Flex, Text, Image, Group, UnstyledButton, Modal, Tooltip} from "@mantine/core";
import useGlobalStore from "@/store/GlobalStore";
import './ProfilePage.scss'
import {IconSettings} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {ChangeUserMeta} from "@/components/ChangeUserMeta";
import {AchivmentsRow} from "@/components/AchivmentsRow";

export const ProfilePage = () => {
    const { userName, avatar, checkAchivments, shop } = useGlobalStore()
    const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
    useEffect(() => { checkAchivments() }, [])
    return (
        <>
            <title>Профиль | Трекер привычек</title>
            <Modal opened={opened} onClose={closeModal} title="Сменить данные">
                <ChangeUserMeta close={closeModal} userName={userName} />
            </Modal>
            <div className={styles.container}>
                <Flex direction={"column"} align={"center"} className={styles.user}>
                    <AspectRatio
                        style={{cursor: shop["changeImg"].purchased ? "pointer" : "auto" }}
                        ratio={1}
                        className={styles.user__icon}
                        onClick={shop["changeImg"].purchased ? openModal : () => {}}
                    >
                        <Image
                            className={styles.user__icon}
                            radius="xl"
                            src={avatar ? avatar : "/Avatar.jpg"}
                            alt="Avatar"
                        />
                    </AspectRatio>
                    <Group align={"center"} gap={"5px"}>
                        <Text size={"xl"} fw={600} className={styles.user__userName}>{userName}</Text>
                        <Tooltip label={"Купите в магазине"} disabled={shop["changeImg"].purchased} position={"bottom"}>
                            <UnstyledButton disabled={!shop["changeImg"].purchased} onClick={openModal}>
                                <IconSettings stroke={2} size={20} />
                            </UnstyledButton>
                        </Tooltip>
                    </Group>
                </Flex>
                <div className={`${styles.charts} ${styles.DayForm}`}>
                    <DayStatsChart />
                </div>
                <div className={`${styles.charts} ${styles.TimeForm}`}>
                    <TimeStatsChart />
                </div>
                <div className={styles.achivments}>
                    <Text size={"xl"} fw={600} className={styles.achivments__title}>Достижения</Text>
                    <AchivmentsRow />
                </div>
            </div>
        </>
    )
}