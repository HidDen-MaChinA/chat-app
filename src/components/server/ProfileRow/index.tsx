import React from "react";

type propsType = {
    label:string;
    rest:any
}

export function ProfileRow(props:propsType):React.ReactElement{
    const { label , rest} = props
    return( 
        <div>
            <label htmlFor="">
                {label}
            </label>    
            <input type="text" {...rest}/>
        </div>
    )

}