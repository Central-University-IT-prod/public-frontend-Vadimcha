'use client'
import React, {useState} from 'react';
import {Space, Switch} from "@mantine/core";
import {useFormik} from "formik";
import useGlobalStore from "@/store/GlobalStore";
import {Button} from "@mantine/core";
import toast from "react-hot-toast";

export const DeleteHabit = ({ids, close}: {ids: number[], close: () => void}) => {
    const [save, setSave] = useState<boolean>(false)
    const {deleteHabits} = useGlobalStore()
    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {
            deleteHabits(ids, save)
            toast.success("Привычка удалена", {
                position: "bottom-right"
            })
            close()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Switch
                label="Сохранить историю"
                checked={save}
                onChange={(event) => setSave(event.target.checked)}
            />
            <Space h={"md"}/>
            <Button
                type={'submit'}
            >Удалить</Button>
        </form>
    )
}