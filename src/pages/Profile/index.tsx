import React from "react"
import styles from "./styles.module.css"
import { store, loggedUserType } from "@/store"
import { ProfileRow } from "@components/server"
import { Pending } from '@components/client';
import { useForm } from "react-hook-form"
import Layout from "@/components/server/layout";
import { Auth } from "@/components/client/Auth";
import { putUser , putUserType} from "@/request";


export default function (): React.ReactElement {
    const { loggedUser } = store(store => store)
    const { register , getValues} = useForm<putUserType>()
    const handleClick = async ()=>{
        const token = localStorage.getItem("chat_token")
        if(token){
            putUser(token,getValues())
        }
    }
    return (
        <Auth>
            <Layout>
                <Pending<loggedUserType> pending={loggedUser}>
                    <main className={styles.main_container}>
                        <ProfileRow rest={register("name")} label={"name"} placeholder={loggedUser?.name}/>
                        <ProfileRow rest={register("oldpassword")} label={"Old password"}/>
                        <ProfileRow rest={register("newPassword")} label={"New password"}/>
                        <div className={styles.bio}>
                            <label htmlFor="">
                                bio
                            </label> 
                            <textarea id="" cols={30} rows={10} {...register("bio")}></textarea>
                        </div>
                        <button onClick={handleClick}>submitChange</button>
                    </main>
                </Pending>
            </Layout>
        </Auth> 
    )
}