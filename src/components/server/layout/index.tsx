import React, { ReactElement } from "react";
import { Button } from "../Button";
import styles from './layout.module.css';
import { store } from "@/store";
import { useRouter } from "next/router";

type layoutProps = {
    children:ReactElement;
}

export default function (props:layoutProps):React.ReactElement{
    const {unauthorize} = store(state=> state)
    const {children} = props;
    const route = useRouter()
    const revokeAccess = ()=>{
        unauthorize();
        localStorage.removeItem("chat_token")
        route.push("/Login")
    }
    const changeRoute = (str:string) => {
        route.push(str)
    }
    return (
        <>
            <nav className={styles['main-container']}>
                    <span className={styles.menu}>
                        <Button label="Profile" id="profile" onClick={()=>{changeRoute("/Profile")}} />
                        <Button label="Channel" id="channel" onClick={()=>{changeRoute("/Channel")}} />
                    </span>
                    <span className={styles.user_information}>
                        <label htmlFor="logout">
                            <span className={styles.logout} ><span>logout</span></span>
                            <input type="button" id="logout" hidden onClick={revokeAccess} />
                        </label>
                    </span>
            </nav>
            {children}
        </>
    )   
}