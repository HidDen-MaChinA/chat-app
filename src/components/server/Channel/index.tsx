import React, { ReactElement, useCallback, useEffect, useState } from "react";
import styles from './styles.module.css';
import { Auth } from "@/components/client/Auth";
import Layout from "@/components/server/layout";
import { useRouter } from "next/router";
import { getChannels, createChannelType } from "@/request";
import { Pending } from "@/components/client";

type propsType = {
    children?:ReactElement;
}

export default function (props:propsType): React.ReactElement {
    const {children} = props;
    const route = useRouter();
    const [channels, setChannels] = useState<createChannelType[] | null>(null);
    const getChannelsWithCallback = useCallback((token: string) => getChannels(token), [])
    useEffect(() => {
        const token = localStorage.getItem("chat_token")
        if (token) {
            getChannelsWithCallback(token).then(({ data }) => {
                setChannels(data.channels)
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [getChannelsWithCallback])
    return (
        <Auth>
            <Layout>
                <main className={styles['channel-grid-areas']}>
                    <nav className={styles['bar-area']}>
                        <div className={styles['channel-title']}>
                            <span>Channel list</span>
                        </div>
                        <Pending<createChannelType[]> pending={channels}>
                            <>
                                {channels?.map((channel,i)=>(
                                    <label htmlFor={channel.name+i} className={styles['channel-swap']} key={channel.name + i}>
                                    <span>{channel.name}</span>
                                    <input type="button" id={channel.name+i} hidden />
                                    </label>
                                ))}
                            </>
                        </Pending>
                        <label htmlFor="createChannel" className={styles['channel-swap']}>
                            <span>Create Channel</span>
                            <input type="button" onClick={() => { route.push("/Channel/create") }} id="createChannel" hidden />
                        </label>
                    </nav>
                    <div className={styles['message-area']}>
                        <div className={styles['channel-title']}>
                            <span>Channel 1</span>
                        </div>
                        <div className={styles['users-message']}>
                            {children}
                        </div>
                    </div>
                </main>
            </Layout>
        </Auth>
    )

}