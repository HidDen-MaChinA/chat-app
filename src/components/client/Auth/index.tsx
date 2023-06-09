import React, { ReactElement } from "react";
import { useEffect , useCallback} from "react";
import { store } from "@/store";
import { getCurrentUser } from "@/request";
import { useRouter } from "next/router";

type propsType = {
    children:React.ReactElement
}

export function Auth(props:propsType):ReactElement{
    const {children} = props
    const {  authorization , registryUser, unauthorize} = store(store => store);
    const getCurrentUserWithCallback = useCallback((token:string)=>getCurrentUser(token),[authorization])
    const route = useRouter();
    useEffect(()=>{
        const token=localStorage.getItem("chat_token");
        if(token){
            getCurrentUserWithCallback(token).then((user)=>{
            registryUser(user);
          }).catch((e)=>{
            if(e.response.statusText==="Unauthorized"){
              localStorage.removeItem("chat_token");
              unauthorize();
              route.push("/Login")
            }
          })
        }else{
          route.push("/Login")
        }
    },[getCurrentUserWithCallback])
    
    return(
        <>
           {children}
        </>
    )
}