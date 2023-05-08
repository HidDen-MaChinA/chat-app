import { GlobalStore } from "@/store";
import useToogle from "@/hooks/useToogle";
import style from "./style.module.css";
import { useRouter } from "next/router";
import { InputPassword, InputText } from "@/components/Input";
import { useEffect } from "react";

function Login():React.ReactElement{
  const { value, setPassword, setUser , auth , identifieCredential } = GlobalStore(state=>state);
  const { toogle , changing } = useToogle(false);
  const route = useRouter();
  const storeToLocalStorage = async ()=>{
    identifieCredential(value)
    if(auth){
      console.log("another oke")
      route.replace("/GlobalChat")
    }
    console.log("oke")
  }
  useEffect(()=>{
    const key = localStorage.key(0)
    key!==null ? identifieCredential({user:key,password:localStorage.getItem(key)}) : console.log("no key")
  })
  return(
    <div className={style.Loginwrapper} >
      <InputText handleInput={setUser} label="Username"/>
      <InputPassword handleInput={setPassword} label="Password" type={changing ? "text":"password"} handleInputType={toogle}/>
      <button onClick={storeToLocalStorage}>submit</button>
    </div>
);
}

export function getStaticProps(){
  return {
    props:{

    }
  }
}

export default Login;