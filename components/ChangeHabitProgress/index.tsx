'use client'
import React, {useState} from 'react';
import {Slider, Space, Switch} from "@mantine/core";
import './ChangeHabitProgress.scss'
import {IHabit} from "@/models/IHabit";
import {useFormik} from "formik";
import useGlobalStore from "@/store/GlobalStore";
import {Button} from "@mantine/core";

export const ChangeHabitProgress = ({ item, close }: {item: IHabit, close: () => void}) => {
    const [progress, setProgress] = useState<number>(item.progress)
    const {changeHabitProgress} = useGlobalStore()
    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {
            changeHabitProgress(item.id, progress)
            close()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            { item.maxProgress == 1 ?
                <Switch
                    checked={progress > 0}
                    defaultChecked={item.maxProgress == 1}
                    label="Я выполнил поставленную цель"
                    onChange={(event) => setProgress(event.currentTarget.checked ? 1 : 0)}
                />
                :
                <>
                    <Space h={"md"}/>
                    <Slider
                        value={progress}
                        max={item.maxProgress}
                        onChange={setProgress}
                        labelAlwaysOn
                    />
                </>
            }
            <Space h={"md"}/>
            <Button
                type={'submit'}
            >Сохранить изменения</Button>
        </form>
    );
}