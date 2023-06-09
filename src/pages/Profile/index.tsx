import React from "react"
import styles from "./styles.module.css"
import { store, loggedUserType } from "@/store"
import { ProfileRow } from "@components/server"
import { Pending } from '@components/client';
import { useForm } from "react-hook-form"
import Layout from "@/components/server/layout";
import { Auth } from "@/components/client/Auth";


export default function (): React.ReactElement {
    const { loggedUser } = store(store => store)
    const { register } = useForm<loggedUserType>()
    return (
        <Auth>
            <Layout>
                <Pending<loggedUserType> pending={loggedUser}>
                    <main className={styles.main_container}>
                        <ProfileRow rest={register("name")} label={"name"}/>
                        <ProfileRow rest={register("status")} label={"status"}/>
                    </main>
                </Pending>
            </Layout>
        </Auth> 
    )
}