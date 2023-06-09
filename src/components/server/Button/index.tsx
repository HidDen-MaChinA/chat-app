import React from "react"
import styles from './styles.module.css'

type propsType = {
    label:string;
    id:string;
    [args:string]:any
}

export function Button(props:propsType){
    const {label, id, ...rest} = props
    return(
    <label htmlFor={id} className={styles['btn-label']}>
        <span><span>{label}</span></span>
        <input type="button" id={id} {...rest} hidden/>
    </label>
    )
}