import { Auth, UserCredential } from "firebase/auth";
import { create, StateCreator } from "zustand";
import {createUser, identifieCredential } from './authProvider';
import { useRouter } from "next/router";
interface oneStateType<T>{
  value:T,
  clearState:()=>(void),
  createAuth:()=>(void),
  identifieCredential:(value:loginControle)=>(void)
  [args : string] : any
}

interface GlobaleStateType extends authentificationType,oneStateType<loginControle>{

}

interface loginControle{
  user:string,
  password:string 
}

interface authentificationType{
  auth:UserCredential | undefined,
  name:string | undefined,
  unAuthorizeAuth:()=>(void),
  AuthorizeAuth:(value:UserCredential | void )=>(void)
}

const formSlice:StateCreator<GlobaleStateType,[],[],oneStateType<loginControle>> = (set,get)=>({
  value:{
    password:"",
    user:""
  },
  clearState:()=>{
    set( () =>({value:{user:"",password:""}}))
  },
  setPassword:(str:string)=>{
    console.log(get().value)
    set( (state) =>({value:{...state.value,password:str}}))
  },
  setUser:(str:string)=>{
    set( (state) =>({value:{...state.value,user:str}}))
  },
  createAuth:()=>{
    const {value} = get();
    createUser(value.user,value.password)
  },
  identifieCredential:(value)=>{
    const { AuthorizeAuth} = get()
    identifieCredential(value.user,value.password).then((val)=>{
      console.log(val)
      AuthorizeAuth(val)
      localStorage.setItem(value.user,value.password);
    }).catch(()=>{
      alert("diso ny credential")
    })
  }
})

const authSlice:StateCreator<GlobaleStateType,[],[],authentificationType> = (set,get)=>({
  auth:undefined,
  name:undefined,
  unAuthorizeAuth:()=>{
    set((state)=>({authentified:undefined,name:undefined}))
  },
  AuthorizeAuth:(val)=>{
    if(!val){
      return get()
    }
    
    set(()=>({auth:val}))
  }
})

export const GlobalStore : StateCreator<GlobaleStateType,[],[],GlobaleStateType> = create<oneStateType<loginControle> & authentificationType>()((...params)=>({
  ...formSlice(...params),
  ...authSlice(...params),
}))