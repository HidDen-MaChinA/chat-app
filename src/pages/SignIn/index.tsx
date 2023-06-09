import React from "react";
import { useEffect , useCallback} from "react";
import styles from "@styles/signIn.module.css";
import useToogle from "@/hooks/useToogle";
import { useForm } from 'react-hook-form';
import { store } from "@/store";
import { useRouter } from "next/router";
import {createUser, user, getCurrentUser} from '@/request';


export default function (): React.ReactElement {
    const route=useRouter()
    const {authorization} = store(state=>state)
    const { changing , toogle } = useToogle(false);
    const { register , getValues } = useForm<user>()
    const getCurrentUserWithCallback = useCallback((token:string)=>getCurrentUser(token),[authorization])
    const handleSubmit = async () => {
        const {bio,email,password,name} = getValues();
        createUser({
            bio:bio,
            email:email,
            password:password,
            name:name
        }).then((data)=>{
            console.log("those are data:"+data)
        }).catch((e)=>{
            console.error(e)
        })
    }

    useEffect(()=>{
        const token=localStorage.getItem("chat_token");
        if(token){
          getCurrentUserWithCallback(token).then((data)=>{
            console.log(data)
            route.push("GlobalChat");
          }).catch(()=>{
            console.log("an error occured")
          })
        }
      },[getCurrentUserWithCallback])
    return (
        <div className={styles.container}>
            <span>email</span>
            <input type="email" {...register("email")}/>
            <span>name</span>
            <input type="text" {...register("name")}/>
            <span>password</span>
            <input type={changing ? "text" : "password"} {...register("password")}/>
            <button onClick={toogle}>see</button>
            <span>bio</span>
            <textarea id="" cols={40} rows={10} {...register("bio")}></textarea>
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}