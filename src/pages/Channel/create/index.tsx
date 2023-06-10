import { Auth } from "@/components/client/Auth";
import Layout from "@/components/server/layout";
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { createChannel , createChannelType ,user,getUsers} from "@/request";
import { Pending } from "@/components/client";

export default function (): React.ReactElement {
    const { register ,getValues} = useForm<createChannelType>();
    const [users, setUsers] = useState<user[] | null>(null);
    const [Members,setMembers] = useState<user[]>([]);
    const handleSubmit = () =>{
        const token = localStorage.getItem("chat_token");
        const toSend = (()=>{
            return Members.map((user)=>(
                user.id
            ))
        })()
        if(token && toSend !== undefined){
            console.log(getValues())
           createChannel(token,{...getValues(),members:toSend}).then((data)=>{
                console.log(data)
           }).catch((e)=>{
                console.log(e)
           })
        }else{
            console.log("no tokken")
        }
    }
    const getUsersWithCallback = useCallback((token:string)=>getUsers(token),[])
    useEffect(()=>{
        const token = localStorage.getItem("chat_token")
        if(token){
            getUsersWithCallback(token).then((data)=>{
                setUsers(data.data.users)
            }).catch((e)=>{
                console.log(e)
            })
        }
    },[getUsersWithCallback])
    return (
        <Auth>
            <Layout>
                <div className={styles.container}>
                    <span>name</span>
                    <input type="text" {...register("name")} />
                    <span>type</span>
                    <input type="text" {...register("type")} />
                    <span>Members</span>
                    <div className={styles.userList}>
                        {Members.length===0 ? <></>: 
                        <div className={styles.selected}>
                            {Members.map((member,i)=>(
                                <button onClick={()=>{
                                    Members.splice(i,1)
                                    setMembers([...Members]);
                                }}>{member.name}</button>
                            ))}
                        </div>
                        }
                        <Pending<user[]> pending={users}>
                           <div className={styles.toSelect}>{users?.map((user,i)=>(
                            <button key={user.name+i} onClick={()=>{
                                if(Members.indexOf(user) === -1){
                                    setMembers([...Members,user]);
                                }
                            }}>{user.name}</button>
                           ))}
                           </div>
                        </Pending>
                    </div>
                    <button onClick={handleSubmit}>submit</button>
                </div>
            </Layout>
        </Auth>
    )
}