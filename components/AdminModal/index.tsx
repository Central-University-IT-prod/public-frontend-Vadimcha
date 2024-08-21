import React, {useState} from 'react'
import {Button, FileInput, Space, TextInput} from "@mantine/core";
import {useFormik} from "formik";
import useGlobalStore from "@/store/GlobalStore";
import {IHabit} from "@/models/IHabit";

export const AdminModal = ({ close }: { close: () => void }) => {
    const { addTime, setAddTime, getNewId, addNewHabit, changeHabitProgress } = useGlobalStore()
    const [file, setFile] = useState<File | null>(null)
    let dateWithAdd = new Date()
    dateWithAdd.setTime(dateWithAdd.getTime() + addTime)
    const formik = useFormik({
        initialValues: {
            date: `${dateWithAdd.getDate()}.${dateWithAdd.getMonth() + 1 < 10 ? `0${dateWithAdd.getMonth() + 1}` : dateWithAdd.getMonth() + 1}.${dateWithAdd.getFullYear()}`,
        },
        onSubmit: (values) => {
            setAddTime(values.date)
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const result = event.target?.result;
                    const types = { 'daily': 'Ежедневная', 'weekly': 'Еженедельная', 'monthly': 'Ежемесячная'}
                    const plusId = getNewId() as number
                    if (result) {
                        const data = JSON.parse(result as string) as DataToUpload;
                        data.habits.map((item: Habit)  => { // Добавление задач
                            addNewHabit({
                                createdAt: new Date(item.addDate),
                                updatedAt: new Date(item.addDate),
                                id: plusId + item.id,
                                name: item.title,
                                category: item.category,
                                type: types[item.period],
                                progress: 0,
                                maxProgress: item.targetValue ? item.targetValue : 1
                            })
                        })
                        data.actions.map((item: HabitAction) => {
                            return changeHabitProgress(
                                item.id + plusId,
                                item.value ? item.value : 1,
                                new Date(item.date),
                        )
                        })
                    }
                }
                reader.readAsText(file);
            }
            close()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <TextInput
                size={"xs"}
                label="Изменить сегодняшнюю дату (дд.мм.гггг)"
                onChange={formik.handleChange}
                name={"date"}
                value={formik.values.date}
                placeholder="Введите дату"
            />
            <FileInput
                size={"xs"}
                label={"Загрузите готовые задачи"}
                placeholder={"Загрузите файл"}
                value={file}
                onChange={setFile}
                accept={'application/json'}
            />

            <Space h={"md"} />
            <Button type={"submit"}>Сохранить</Button>
        </form>
    )
}