"use client"
import React from 'react';
import {
    ActionIcon,
    Button,
    Flex,
    Group,
    NavLink,
    Space,
    useMantineColorScheme,
    Modal,
    Text,
    UnstyledButton, Popover, ColorPicker
} from "@mantine/core";
import {INavLink, NavLinks} from "@/components/NavBar/NavLinks";
import {IconAdjustmentsAlt, IconMoon, IconSun} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {AdminModal} from "@/components/AdminModal";
import useGlobalStore from "@/store/GlobalStore";
import {colorHexes, colorNames, mySwatches} from "@/data/PrimaryColors";

export const NavBar = ({ toggle, children }: { toggle: () => void, children: React.ReactNode }) => {
    const { setColorScheme, colorScheme } = useMantineColorScheme();
    const [openedAdmin, { open: openAdminModal, close: closeAdminModal }] = useDisclosure(false);
    const {money, primaryColor, setPrimaryColor, shop} = useGlobalStore()
    return (
        <div>
            <Modal opened={openedAdmin} onClose={closeAdminModal} title="Настройки для организаторов">
                <AdminModal close={closeAdminModal} />
            </Modal>
            <Flex justify={"space-between"}>
                <Group>
                    <h2>Logo</h2>
                    <ActionIcon
                        radius={"xl"}
                        size={"md"}
                        onClick={() => { toggle(); setColorScheme(colorScheme== "light" ? "dark" : "light" ) }}
                    >
                        { colorScheme == "light" ?
                            <IconSun size={18} stroke={2} /> :
                            <IconMoon size={18} stroke={2} />
                        }
                    </ActionIcon>
                </Group>
                <Group>
                    <Popover width={200} position="bottom" withArrow shadow="md">
                        <Popover.Target>
                            <UnstyledButton w={20} h={20} style={{ borderRadius: "5px" }} bg={primaryColor} />
                        </Popover.Target>
                        <Popover.Dropdown p={'5px'}>
                            {shop["changePrimaryColor"].purchased ? <ColorPicker
                                format="hex"
                                value={colorHexes[primaryColor]}
                                onChange={e => setPrimaryColor(colorNames[e])}
                                withPicker={false}
                                fullWidth
                                swatches={mySwatches}
                            /> : <Text size={"sm"}>Купите в магазине</Text> }
                        </Popover.Dropdown>
                    </Popover>
                    {children}
                </Group>
            </Flex>
            <Space h="md" />
            <div>
                <Flex direction={"column"}>
                    { NavLinks.filter(link => link.navLink).map((link: INavLink) => {
                        return link.label != 'Таймер' || shop['timer'].purchased ? (
                            <NavLink
                                key={link.src}
                                href={link.src}
                                label={link.label}
                                leftSection={link.icon}
                                rightSection={link.label == 'Магазин' ? <Text size={"sm"}>{money}🪙</Text> : <></>}
                            />
                        ) : <div key={link.src}></div>
                    }) }
                    <Button size={"xs"} onClick={openAdminModal} leftSection={<IconAdjustmentsAlt size={20} stroke={2} />}>
                        Для организаторов
                    </Button>
                </Flex>
            </div>
        </div>
    )
}