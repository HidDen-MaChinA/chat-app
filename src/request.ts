import axios from "axios"
import {loggedUserType} from '@/store';

export type user = {
    email:string,
    password:string,
    bio:string,
    name:string,
    id?:number
}

export type putUserType = {
    oldpassword:string,
    bio:string,
    name:string,
    newPassword:string
}

export type userLogin = {
    email:string,
    password:string
}

export type createChannelType={
    name:string;
    type:"private" | "public";
    members:number[];
}


export async function createUser(args:user):Promise<user>{
    return axios.post('http://localhost:8080/users',{
            email:args.email,
            password:args.password,
            bio:args.bio,
            name:args.name
        }
    )
}

export async function logingUser(args:userLogin){
    return axios.post('http://localhost:8080/users/login',{
        email:args.email,
        password:args.password
    })
}

export async function getCurrentUser(token:string):Promise<loggedUserType>{
    return axios.get("http://localhost:8080/user",{
        headers:{
            authorization:`Bearer ${token}`
        }
    });
}

export async function createChannel(token:string,toCreate:createChannelType){
    return axios.post("http://localhost:8080/channel",toCreate,{
        headers:{
            authorization:`Bearer ${token}`   
        },
    })
}

export async function getUsers (token:string){
    return axios.get("http://localhost:8080/users",{
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    );
}
export async function getChannel(){
    
}

export async function getChannels(token:string){
    return axios.get("http://localhost:8080/Channels",{
        headers:{
            authorization:`Bearer ${token}`
        }
    })

}
export async function addMembersToChannel(){

}

export async function putUser(token:string,tochange:putUserType){
    return axios.put("http://localhost:8080/channedolp",tochange,{
        headers:{
            authorization:`Bearer ${token}`   
        },
    })
}