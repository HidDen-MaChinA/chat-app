import React from "react";
import { Loading } from "./loading";

type propsType <T>= {
    children:React.ReactElement;
    pending:T | null
}

export function Pending<T>(props:propsType<T>):React.ReactElement{
    const {children,pending} = props;
    const isNull=pending === null
    
    return(
        <>
            {isNull ? <Loading />:children}
        </>
    )
}