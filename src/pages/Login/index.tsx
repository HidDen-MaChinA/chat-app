import useToogle from "@/hooks/useToogle";
import style from "./style.module.css";
import { useRouter } from "next/router";
import { InputPassword, InputText } from "@/components/server/Input";
import { useForm } from "react-hook-form";
import {logingUser,getCurrentUser} from '@/request';
import { store } from "@/store";
import { useEffect , useCallback } from "react";

type LoginForm = {
  email:string,
  password:string
}

function Login():React.ReactElement{
  const { register , getValues } = useForm<LoginForm>()
  const { toogle , changing } = useToogle(false);
  const { authorize, authorization , registryUser} = store(store => store);
  const getCurrentUserWithCallback = useCallback((token:string)=>getCurrentUser(token),[authorization])
  const route = useRouter();
  const storeToLocalStorage = async ()=>{
    await logingUser({email:getValues().email,password:getValues().password}).then((data)=>{
      localStorage.setItem("chat_token",data.data.user.token)
      registryUser(data.data.user)
      authorize()
    }).catch((e)=>{
      if(e.code==="ERR_BAD_REQUEST")console.log(e.message)
    });
  }
  useEffect(()=>{
    const token=localStorage.getItem("chat_token");
    if(token){
      getCurrentUserWithCallback(token).then((user)=>{
        registryUser(user)
        route.push("/Profile");
      }).catch((e)=>{
        if(e.code==="NOT_FOUND"){
          localStorage.removeItem("chat_token")
        }
        console.log("an error occured")
      })
    }
  },[getCurrentUserWithCallback])
  return(
    <div className={style.Loginwrapper} >
      <InputText label="email" args={register("email")} />
      <InputPassword label="Password" type={changing ? "text":"password"} handleInputType={toogle} args={register("password")} />
      <button onClick={storeToLocalStorage}>submit</button>
      <button onClick={()=>{route.push('/SignIn')}} className={style.signIn}>SignIn</button>
    </div>
);
}

export default Login;