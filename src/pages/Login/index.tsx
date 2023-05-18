import useToogle from "@/hooks/useToogle";
import style from "./style.module.css";
import { useRouter } from "next/router";
import { InputPassword, InputText } from "@/components/Input";
import { useEffect } from "react";

function Login():React.ReactElement{
  const { toogle , changing } = useToogle(false);
  const route = useRouter();
  const storeToLocalStorage = async ()=>{
  }
  return(
    <div className={style.Loginwrapper} >
      <InputText handleInput={()=>{console.log("ok")}} label="Username"/>
      <InputPassword handleInput={()=>{console.log("ok")}} label="Password" type={changing ? "text":"password"} handleInputType={toogle}/>
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