import React from "react";

interface mockType{
    id:number;
    name:string;
    isavailable:boolean
}

interface homeProps{
    data:mockType
}

async function Mock(id:number,name:string,isavailable:boolean):Promise<mockType>{
    return new Promise<mockType>((resolve)=>{
        setTimeout(()=>{
            const mock = {
                id:id,
                name:name,
                isavailable:isavailable
            }
            resolve(mock);
        },100)
    }).then();
}

export async function getServerSideProps({ params }:any){
    const data = await Mock(params.id,"franco",false)
    return {
        props:{data:data},
    }
}

export default function home(props:homeProps):React.ReactElement{
    const { data } = props;
    return (
        <>
            <p>the personne with id {data.id} have the name {data.name} and {data.isavailable ? "is available" : "is not available"}</p>
        </>
    )
}

