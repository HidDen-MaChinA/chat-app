import { useState } from "react"

interface useToogleType{
    changing:boolean,
    toogle:()=>(void)
}

export default function useToogle(initial:boolean):useToogleType{
    const [state,setState] = useState<boolean>(initial);
    return {
        changing:state,
        toogle:()=>{setState(!state)}
    }
}