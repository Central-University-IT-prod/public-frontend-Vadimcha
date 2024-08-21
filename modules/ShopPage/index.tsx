'use client'
import React from 'react';
import {Flex, Text, Popover, Button, Tooltip} from "@mantine/core";
import useGlobalStore from "@/store/GlobalStore";
import {IShopItem} from "@/models/IShopItem";
import {ShopItemsIds} from "@/data/ShopData";

export const ShopPage = () => {
    const {money, buyItem, shop} = useGlobalStore()
    return (
        <>
            <title>Магазин | Трекер привычек</title>
            <Flex direction={"column"} gap={"10px"}>
                {ShopItemsIds.map((id: string) => {
                    const product: IShopItem = shop[id]
                    return (
                        <Flex key={product.id} align={"center"} justify={"space-between"} style={{ padding: "0 5px" }}>
                            <Popover position="bottom" withArrow shadow="md">
                                <Popover.Target>
                                    <Text
                                        size={"sm"}
                                        lineClamp={1}
                                        style={{ width: "fit-content", overflow: "hidden" }}
                                    >{product.name}</Text>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Text size="xs">{product.name}</Text>
                                </Popover.Dropdown>
                            </Popover>
                            <Tooltip label={"Недостаточно средств"} position="bottom" disabled={(product.purchased || (product.price <= money))}>
                                <Button style={{ width: "110px" }} size={"xs"} disabled={product.purchased || (product.price > money)} onClick={() => buyItem(product)}>
                                    { product.purchased ?
                                        'Уже куплено'
                                        : `Купить ${product.price} 🪙` }
                                </Button>
                            </Tooltip>
                        </Flex>
                    )
                })}
            </Flex>
        </>
    )
}