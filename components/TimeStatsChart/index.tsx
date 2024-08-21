"use client"
import React, {useEffect} from 'react';
import styles from './TimeStatsChart.module.scss'
import {Flex, Text} from "@mantine/core";
import {BarChart} from "@mantine/charts";
import useGlobalStore from "@/store/GlobalStore";
import {ChartTooltipProps} from "@mantine/charts";
import {Paper} from "@mantine/core";
import './TimeStatsChart.scss'

export const TimeStatsChart = () => {
    const { timeStats, getTimeStats } = useGlobalStore()
    useEffect(() => {
        getTimeStats()
    }, [])
    function ChartTooltip({ label, payload }: ChartTooltipProps) {
        if (!payload) return null;
        return (
            <Paper px="xs" py="xs" withBorder shadow="xs" radius="sm">
                <Text fw={500} size={"sm"}>{label}</Text>
            </Paper>
        );
    }
    return (
        <div>
            <div className={styles.flexBox}>
                <p className={styles.chartTitle}>Временная активность за неделю</p>
                <BarChart
                    className={styles.chart}
                    h={250}
                    data={timeStats}
                    dataKey="date"
                    yAxisProps={{ orientation: 'left' }}
                    xAxisProps={{ tickMargin: 0 }}
                    series={[
                        { name: 'quantity', color: 'var(--mantine-primary-color-filled)' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    tickLine="y"
                />
            </div>
        </div>
    )
}