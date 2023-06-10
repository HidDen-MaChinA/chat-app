import React from "react";
import styles from './styles.module.css'

type propsType = {
    label:string;
    rest:any;
    [args:string]:any
}

export function ProfileRow(props:propsType):React.ReactElement{
    const { label , rest, ...other} = props
    return( 
        <div className={styles.container}>
            <label htmlFor="">
                {label}
            </label>    
            <input type="text" {...rest} {...other}/>
        </div>
    )

}