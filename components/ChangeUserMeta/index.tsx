import React, {useState} from 'react';
import {useFormik} from "formik";
import {TextInput, Button, FileInput, Flex, Space} from "@mantine/core";
import useGlobalStore from "@/store/GlobalStore";
import toast from "react-hot-toast";

export const ChangeUserMeta = ({ close, userName }: {close: () => void, userName: string}) => {
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string>('')
    const {changeUserMeta} = useGlobalStore()
    const formik = useFormik({
        initialValues: {
            name: userName,
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
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const url = reader.result as string;
                    changeUserMeta({ name: values.name, urlImg: url });
                    toast.success("Данные успешно изменены!", {
                        position: "bottom-right"
                    })
                    close();
                };
                reader.readAsDataURL(file);
            } else {
                changeUserMeta({ name: values.name });
                toast.success("Данные успешно изменены!", {
                    position: "bottom-right"
                })
                close();
            }
            close()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Flex direction={"column"} gap={"xs"}>
                <TextInput
                    size={"xs"}
                    radius="md"
                    label="Изменить никнейм"
                    placeholder="Введите никнейм"
                    name={'name'}
                    error={error}
                    value={formik.values.name}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setError('')
                    }}
                />
                <FileInput
                    size={"xs"}
                    radius="md"
                    value={file}
                    onChange={setFile}
                    accept="image/png,image/jpeg"
                    label="Изменить аватарку"
                    placeholder="Загрузите аватарку"
                />
                <Space h={"md"} />
                <Button size={"xs"} type={"submit"}>Сохранить изменения</Button>
            </Flex>
        </form>
    )
}