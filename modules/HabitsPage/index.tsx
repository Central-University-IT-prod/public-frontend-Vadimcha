"use client"
import React from 'react';
import {ActionIcon, Button, Group, Space, Tabs} from "@mantine/core";
import {IconCalendar, IconCalendarMonth, IconCalendarWeek, IconPlus} from "@tabler/icons-react";
import {HabitsTable} from "@/components/HabitsTable";
import {useDisclosure} from "@mantine/hooks";
import {AddHabit} from "@/components/AddHabit";
import {Modal} from "@mantine/core";

export const HabitsPage = () => {
    const [openedAdd, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
    return ( <>
        <title>Ваши привычки | Трекер привычек</title>
        <Modal opened={openedAdd} onClose={closeAddModal} title="Добавить привычку">
            <AddHabit close={closeAddModal} />
        </Modal>
        <div>
            <Tabs defaultValue={"today"}>
                <Tabs.List>
                    <Group align={"center"} gap={"5px"}>
                        <Group gap={0}>
                            <Tabs.Tab value="today" visibleFrom={"sm"} leftSection={<IconCalendar stroke={2} size={20} />}>
                                Ежедневные
                            </Tabs.Tab>
                            <Tabs.Tab value="today" hiddenFrom={"sm"} leftSection={<IconCalendar stroke={2} size={20} />}>
                                День
                            </Tabs.Tab>
                            <Tabs.Tab value="week" visibleFrom={"sm"} leftSection={<IconCalendarWeek stroke={2} size={20} />}>
                                Еженедельные
                            </Tabs.Tab>
                            <Tabs.Tab value="week" hiddenFrom={"sm"} leftSection={<IconCalendarWeek stroke={2} size={20} />}>
                                Неделя
                            </Tabs.Tab>
                            <Tabs.Tab value="month" visibleFrom={"sm"} leftSection={<IconCalendarMonth stroke={2} size={20} />}>
                                Ежемесячные
                            </Tabs.Tab>
                            <Tabs.Tab value="month" hiddenFrom={"sm"} leftSection={<IconCalendarMonth stroke={2} size={20} />}>
                                Месяц
                            </Tabs.Tab>
                            <Space w={20} hiddenFrom={'sm'} visibleFrom={"sm"} />
                            <ActionIcon onClick={openAddModal} variant="filled" aria-label="Settings" size={"sm"}>
                                <IconPlus stroke={2} size={18} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Tabs.List>
                <Space h="md" />

                <Tabs.Panel value="today">
                    <HabitsTable type={"Ежедневная"} />
                </Tabs.Panel>

                <Tabs.Panel value="week">
                    <HabitsTable type={"Еженедельная"} />
                </Tabs.Panel>

                <Tabs.Panel value="month">
                    <HabitsTable type={"Ежемесячная"} />
                </Tabs.Panel>
            </Tabs>
        </div>
    </>)
}