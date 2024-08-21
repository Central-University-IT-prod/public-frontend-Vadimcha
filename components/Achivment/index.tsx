"use client"
import React from 'react';
import {IAchivment} from "@/models/IAchivment";
import styles from './Achivment.module.scss'
import {Paper, Text} from "@mantine/core";


export const Achivment = ({data}: {data: IAchivment}) => {
    return (
        <Paper withBorder shadow="xl" radius="md" className={`${styles.content} ${data.completed ? styles.active : styles.inactive}`}>
            <p className={styles.icon}>{data.icon}</p>
            <Text size={"sm"}>{data.name}</Text>
        </Paper>
    )
}