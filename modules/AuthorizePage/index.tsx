'use client'
import React, {useState} from 'react';
import {Button, Space, Text, TextInput} from "@mantine/core";
import {useFormik} from "formik";
import useGlobalStore from "@/store/GlobalStore";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export const AuthorizePage = () => {
    const router = useRouter()
    const [error, setError] = useState<string>('')
    const {changeUserMeta} = useGlobalStore()
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            if(values.name.length == 0) {
                setError("Введите никнейм")
                return
            }
            if(values.name.length > 15) {
                setError("Слишком длинный никнейм")
                return
            }
            changeUserMeta(values)
            router.push('/habits')
            toast(`Привет ${values.name}`, {
                position: "bottom-right",
                icon: '👋',
            })
        }
    })
    return (
        <>
            <title>Регистрация | Трекер привычек</title>
            <form onSubmit={formik.handleSubmit} style={{ padding: "0 10px" }}>
                <TextInput
                    size={"sm"}
                    radius="md"
                    label="Для продолжения работы введите никнейм"
                    withAsterisk
                    placeholder="Введите никнейм"
                    name={'name'}
                    error={error}
                    value={formik.values.name}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setError('')
                    }}
                />
                <Space h={"sm"} />
                <Button size={"xs"} type={"submit"}>Продолжить</Button>
            </form>
        </>
    )
}