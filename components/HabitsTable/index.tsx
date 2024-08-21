import React, {useState} from 'react';
import {Button, Popover, Text, Checkbox, Progress, Table, UnstyledButton, Modal, Space} from "@mantine/core";
import {IconAdjustmentsHorizontal, IconTrash, IconTrashX} from "@tabler/icons-react";
import './HabitsTable.scss'
import {useDisclosure} from "@mantine/hooks";
import {ChangeHabitProgress} from "@/components/ChangeHabitProgress";
import {DeleteHabit} from "@/components/DeleteHabit";
import {IHabit} from "@/models/IHabit";
import styles from './HabitsTable.module.scss'
import useGlobalStore from "@/store/GlobalStore";

export const HabitsTable = ({ type }: {type: string}) => {
    const { habits: TableData } = useGlobalStore()
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const [openedChange, { open: openChangeModal, close: closeChangeModal }] = useDisclosure(false);
    const [changeItem, setChangeItem] = useState<IHabit | null>(null)

    const [openedDelete, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [deleteItems, setDeleteItems] = useState<number[]>([])
    const rows = TableData.filter((item) => item.type == type).map((item, pos) => (
        <Table.Tr
            key={item.id}
            bg={selectedRows.includes(item.id) ? 'var(--mantine-color-blue-light)' : undefined}
        >
            <Table.Td className={styles.checkboxBox} style={{ padding: "0 2px" }}>
                <Checkbox
                    size={"sm"}
                    aria-label={`Select row`}
                    checked={selectedRows.includes(item.id)}
                    onChange={(event) =>
                        setSelectedRows(
                            event.currentTarget.checked
                                ? [...selectedRows, item.id]
                                : selectedRows.filter((position) => position !== item.id)
                        )
                    }
                />
            </Table.Td >
            <Table.Td>
                <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <Text
                            size={"sm"}
                            lineClamp={1}
                            style={{ width: "fit-content", overflow: "hidden" }}
                        >{item.name}</Text>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text size="xs">{item.name}</Text>
                    </Popover.Dropdown>
                </Popover>
            </Table.Td>
            <Table.Td className={styles.progressWrap}>
                <div className={styles.progress}>
                    <p className={styles.progressText}>
                        { item.maxProgress == 1 ?
                        (item.progress == 0 ? "Не выполнено" : " Выполнено "):
                        `${item.progress}/${item.maxProgress}`
                    }</p>
                    <Progress
                        className={styles.progressBar}
                        value={Math.ceil(item.progress * 100 / item.maxProgress)}
                    />
                </div>
            </Table.Td>
            <Table.Td className={styles.centerBlock}>
                <Button onClick={() => {openChangeModal(); setChangeItem(item)}} visibleFrom={"md"} size={"xs"} aria-label="Settings" leftSection={<IconAdjustmentsHorizontal size={16} stroke={2} />}>
                    Изменить прогресс
                </Button>
                <UnstyledButton onClick={() => {openChangeModal(); setChangeItem(item)}} hiddenFrom={"md"} aria-label="Settings">
                    <IconAdjustmentsHorizontal size={20} stroke={2} />
                </UnstyledButton>
            </Table.Td>
            <Table.Td className={styles.centerBlock}>
                <Button onClick={() => {openDeleteModal(); setDeleteItems([item.id])}} visibleFrom={"md"} size={"xs"} aria-label="Delete" leftSection={<IconTrash size={20} stroke={2} />}>
                    Удалить
                </Button>
                <UnstyledButton onClick={() => {openDeleteModal(); setDeleteItems([item.id])}} hiddenFrom={"md"} aria-label="Delete">
                    <IconTrash size={20} stroke={2} />
                </UnstyledButton>
            </Table.Td>
        </Table.Tr>
    ));

    return ( <>
    {changeItem != null ?
        <Modal opened={openedChange} onClose={closeChangeModal} title="Изменить прогресс">
            <ChangeHabitProgress item={changeItem} close={closeChangeModal} />
        </Modal> : <></>}

        <Modal opened={openedDelete} onClose={closeDeleteModal} title="Удалить привычку">
            <DeleteHabit ids={deleteItems} close={closeDeleteModal} />
        </Modal>

        <Table withColumnBorders>
            <Table.Thead>
                <Table.Tr className={styles.checkboxBoxWrap}>
                    <Table.Th className={styles.checkboxBox} style={{ padding: "0 2px" }}>
                        <UnstyledButton
                            hidden={selectedRows.length == 0}
                            onClick={() => {
                                openDeleteModal();
                                setDeleteItems(selectedRows)
                            }}
                        >
                            <IconTrashX size={20} stroke={2} />
                        </UnstyledButton>
                    </Table.Th>
                    <Text component={Table.Th} size={"sm"} fw={600} className={styles.column_name}>Название</Text>
                    <Text component={Table.Th} size={"sm"} fw={600} className={styles.column_name}>Прогресс</Text>
                    <Text component={Table.Th} size={"sm"} fw={600} className={styles.column_name}>Изменить</Text>
                    <Text component={Table.Th} size={"sm"} fw={600} className={styles.column_name}>Удалить</Text>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>

    { TableData.filter((item) => item.type == type).length == 0 ?
        <div>
            <Space h={"xl"} />
            <h2 className={styles.no_habit}>
                На данный момент у вас нет
                {` ${type.slice(0, type.length - 2)}ых `.toLowerCase()}
                привычек!
            </h2>
        </div> : <></> }
    </> );
}