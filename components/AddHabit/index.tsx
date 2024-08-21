import React, {useState} from 'react';
import {
    Flex,
    Group,
    Text,
    NumberInput,
    Select,
    Space,
    Switch,
    Button,
    Autocomplete,
    ComboboxStringData
} from "@mantine/core";
import {useFormik} from "formik";
import useGlobalStore from "@/store/GlobalStore";
import {IHabit} from "@/models/IHabit";
import {ILibrary, ILibraryItem} from "@/models/ILibrary";
import toast from "react-hot-toast";

const convertLibrary = (library: ILibrary[]) => {
    let data = Array()
    library.map((libCategory) => data.push({ group: libCategory.category, items: (libCategory.items.map(libItem => libItem.name)) }))
    return data as ComboboxStringData
}

export const AddHabit = ({ close, item }: {close: () => void, item?: ILibraryItem}) => {
    const [name, setName] = useState<string>(item ? item.name : '')
    const [category, setCategory] = useState<string>(item && item.category ? item.category : '')

    const [error, setError] = useState('')
    const [progress, setProgress] = useState<boolean>(!!(item && item.maxProgress && item.maxProgress > 1))
    const {getNewId, addNewHabit, library, deleteFromLibrary, addTime} = useGlobalStore()
    const [type, setType] = useState<string>(item ? item.type : 'Ежедневная')
    const formik = useFormik({
        initialValues: {
            name: '',
            category: '',
            maxProgress: (item && item.maxProgress ? item.maxProgress : 1),
            type: 'Ежедневная',
        },
        onSubmit: values => {
            if(!name) {
                setError("Введите название")
                return
            }
            let copy = values as IHabit
            copy.name = name
            copy.type = type
            copy.category = category
            copy.id = getNewId() as number
            copy.progress = 0
            copy.maxProgress = (copy.maxProgress == 0 ? 1 : copy.maxProgress);
            let date: Date = new Date();
            date.setTime(date.getTime() + addTime)
            copy.createdAt = date;
            copy.updatedAt = date;
            addNewHabit(copy)
            toast.success(`Добавлена ${copy.type.toLowerCase()} привычка`, {
                position: "bottom-right"
            })
            close()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Flex direction={"column"} gap={"md"}>
                <Autocomplete
                    size={"xs"}
                    radius="md"
                    label="Название"
                    withAsterisk
                    placeholder="Введите название привычки"
                    name={'name'}
                    error={error}
                    value={name}
                    onChange={(e) => {
                        setName(e)
                        setError('')
                    }}
                    data={convertLibrary(library)}
                />
                <Select
                    size={"xs"}
                    label="Период привычки"
                    placeholder="Выберите период привычки"
                    data={['Ежедневная', 'Еженедельная', 'Ежемесячная']}
                    allowDeselect={false}
                    checkIconPosition={"right"}
                    defaultValue={'Ежедневная'}
                    value={type}
                    onChange={(e) => setType(String(e))}
                    withAsterisk
                />
                <Autocomplete
                    size={"xs"}
                    label="Категория"
                    placeholder="Введите категорию"
                    value={category}
                    onChange={setCategory}
                    data={library.map(item => item.category)}
                    maxDropdownHeight={200}
                />
                <Group align={"center"} gap={"5px"}>
                    <Flex align={"center"}>
                        <Text size={"xs"}>Включить прогресс</Text>
                        <Switch
                            size={"xs"}
                            defaultChecked={item ? item.maxProgress > 1 : false }
                            onChange={(e) => setProgress(e.target.checked)}
                        />
                    </Flex>
                    <NumberInput
                        style={{width: "80%"}}
                        rightSection={<></>}
                        disabled={!progress}
                        size={"xs"}
                        radius="md"
                        name={'maxProgress'}
                        value={formik.values.maxProgress}
                        onChange={(e) => formik.values.maxProgress = Number(e) }
                        label="Максимальный прогресс"
                        placeholder="Введите максимальный прогресс для привычки"
                    />
                </Group>
            </Flex>
            <Space h={"xl"} />
            <Group>
                <Button type={"submit"}>Добавить</Button>
                {item ?
                    <Button
                        onClick={() => {
                            deleteFromLibrary(item)
                            close();
                        }}
                    >
                        Удалить привычку
                    </Button> : <></>}
            </Group>
        </form>
    )
}