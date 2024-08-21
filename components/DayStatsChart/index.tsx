"use client"
import React, {useEffect} from 'react';
import useGlobalStore from "@/store/GlobalStore";
import {AreaChart, ChartTooltipProps, getFilteredChartTooltipPayload} from "@mantine/charts";
import {Flex, Paper, Text} from "@mantine/core"
import '@mantine/charts/styles.css';
import styles from './DayStatsChart.module.scss'

export const DayStatsChart = () => {
    const { dayStats, getDayStats } = useGlobalStore()
    useEffect(() => {
        getDayStats()
    }, [])
    function ChartTooltip({ label, payload }: ChartTooltipProps) {
        if (!payload) return null;
        return (
            <Paper px="xs" py="xs" withBorder shadow="xs" radius="sm">
                <Text fw={500} size={"sm"}>{label}</Text>
                {getFilteredChartTooltipPayload(payload).map((item: any) => (
                    item.name != 'maxValue' ?
                        <Text key={"Количество"} c={item.color} size={"xs"}>
                            {"Количество"}: {item.value}
                        </Text> : <></>
                ))}
            </Paper>
        );
    }
    return (
        <div className={styles.flexBox}>
            <p className={styles.chartTitle}>Количество выполненных задач</p>
            <AreaChart
                h={250}
                className={styles.chart}
                data={dayStats}
                dataKey="date"
                series={[
                    { name: 'maxValue', color: 'transparent' },
                    { name: 'quantity', color: 'var(--mantine-primary-color-filled)' },
                ]}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                yAxisProps={{ tickMargin: 0 }}
                xAxisProps={{ tickMargin: 0 }}
                curveType="linear"
                gridAxis="x"
                connectNulls
            />
        </div>
    )
}