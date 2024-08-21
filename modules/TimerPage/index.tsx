"use client"
import React, {useState} from 'react';
import {Button, Flex, Group, RingProgress, SegmentedControl, Text, UnstyledButton} from "@mantine/core";
import {IconPlayerPause, IconPlayerPlay, IconRotateClockwise2} from "@tabler/icons-react";
import {useTimer} from "@/hooks/useTimer";
import {number} from "prop-types";

export const TimerPage = () => {
    const [workTime, setWorkTime] = useState<number>(300)
    const {time, pause, isPaused, reset, reformatTime} = useTimer(workTime)
    return (
        <>
            <title>Таймер | Трекер привычек</title>
            <Flex align={"center"} direction={"column"} gap={0}>
                <RingProgress
                    size={200}
                    thickness={15}
                    sections={[{ value: time / workTime * 100, color: 'var(--mantine-primary-color-filled)' }]}
                    label={
                        <Flex align={"center"} direction={"column"} gap={"5px"}>
                            <Text c="var(--mantine-primary-color-filled)" fw={700} ta="center" size="2rem">
                                { reformatTime(workTime - time) }
                            </Text>
                            <SegmentedControl
                                size={"xs"}
                                value={workTime.toString()}
                                onChange={e => setWorkTime(Number(e))}
                                data={[ {label: '5м', value: '300'},
                                    {label: '10м', value: '600'},
                                    {label: '20м', value: '1200'}, ]}
                            />
                        </Flex>
                    }
                />
                <Group align={"center"}>
                    <UnstyledButton onClick={pause}>
                        { isPaused ?
                            <IconPlayerPlay stroke={2} size={30} /> :
                            <IconPlayerPause stroke={2} size={30} /> }
                    </UnstyledButton>
                    <UnstyledButton onClick={reset}>
                        <IconRotateClockwise2 stroke={2} size={30} />
                    </UnstyledButton>
                </Group>
            </Flex>
        </>
    )
}