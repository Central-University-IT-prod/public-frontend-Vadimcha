"use client"
import React from 'react';
import {Achivment} from "@/components/Achivment";
import useGlobalStore from "@/store/GlobalStore";
import styles from './AchivmentRow.module.scss'

export const AchivmentsRow = () => {
    const { achivments } = useGlobalStore()
    const arr = achivments.sort((a, b) => {
        if(!a.completed && b.completed) return 1
        else if(a.completed && !b.completed) return -1
        return 0
    })
    return (
        <div className={styles.achivmentsRow}>
            { arr.map(data => <Achivment key={data.name} data={data} />) }
        </div>
    )
}