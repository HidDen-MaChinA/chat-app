import React, { MouseEventHandler } from "react";
import style from "./style.module.css";
import { GlobalStore } from "@/store";

interface InputPropsType {
  handleInput:(value:string)=>void,
  label:string
}

interface PasswordPropsType extends InputPropsType{
  type:string,
  handleInputType:()=>void
}

export function InputText(props:InputPropsType):React.ReactElement{
  const { handleInput, label } = props;
  return(
    <div className={style.textInput} >
        <label htmlFor="">{ label }</label>
        <input type="text" onChange={(e)=>{ handleInput(e.target.value) }} />
    </div>
  );
}

export function InputPassword(props:PasswordPropsType):React.ReactElement{
  const { handleInput, label , type ,handleInputType } = props;
  return(
     <div className={style.password} >
        <label htmlFor="">{label}</label>
        <input type={type} onChange={(e)=>{ handleInput(e.target.value) }}/>
        <button onClick={handleInputType}>see</button>
     </div>
  );
}
