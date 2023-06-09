import React from "react";
import style from "./style.module.css";

interface InputPropsType {
  label:string,
  args:any
}

interface PasswordPropsType extends InputPropsType{
  type:string,
  handleInputType?:()=>void
}

export function InputText(props:InputPropsType):React.ReactElement{
  const { label , args } = props;
  return(
    <div className={style.textInput} >
        <label htmlFor="">{ label }</label>
        <input type="text" {...args} />
    </div>
  );
}

export function InputPassword(props:PasswordPropsType):React.ReactElement{
  const { label , type ,handleInputType , args} = props;
  return(
     <div className={style.password} >
        <label htmlFor="">{label}</label>
        <input type={type} {...args} />
        <button onClick={handleInputType}>see</button>
     </div>
  );
}
