"use client"
import React, {useState} from 'react';
import styles from './LibraryPage.module.scss'
import useGlobalStore from "@/store/GlobalStore";
import {Accordion, List, Modal, Text, UnstyledButton} from "@mantine/core";
import {IconDotsVertical} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {AddHabit} from "@/components/AddHabit";
import {ILibraryItem} from "@/models/ILibrary";
import './LibraryPage.scss'

export const LibraryPage = () => {
    const {library} = useGlobalStore()
    const [addItem, setAddItem] = useState<ILibraryItem | null>()
    const [openedAdd, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
    return (
        <>
            <title>Библиотека | Трекер привычек</title>
            <Modal opened={openedAdd} onClose={closeAddModal} title="Добавить привычку">
                {addItem ? <AddHabit close={closeAddModal} item={addItem}/> : <></>}
            </Modal>
            {library.length ? <Accordion variant="separated">
                {library.map((libraryItem) => (
                    <Accordion.Item key={libraryItem.category} value={libraryItem.category}>
                        <Accordion.Control>{libraryItem.category}</Accordion.Control>
                        {libraryItem.items.length ? <List component={Accordion.Panel}>
                            {libraryItem.items.map((habit) => {
                                return <List.Item
                                    key={habit.name} icon={
                                    <IconDotsVertical stroke={2} size={20} onClick={() => {
                                        setAddItem(habit);
                                        openAddModal()
                                    }} style={{cursor: "pointer", paddingTop: "5px"}}/>
                                }>
                                    <div className={styles.habitItem}>
                                        <Text size={"md"}>{habit.name}</Text>
                                    </div>
                                </List.Item>
                            }) }
                        </List> : <Accordion.Panel><Text>Пока нет привычек в этой категории</Text></Accordion.Panel>}
                    </Accordion.Item>
                ))}
            </Accordion> : <Text size={"md"}>У вас нет сохранённых привычек</Text>}
        </>
    )
}