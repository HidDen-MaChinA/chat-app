import React, { useEffect } from "react";
import { GlobalStore } from "@/store";
import { useRouter } from "next/router";

function GlobalChat():React.ReactElement{
  const { auth } = GlobalStore( state=> state)
  const route = useRouter();
  useEffect(()=>{
    if(!auth){
        route.replace("/Login")
    }
  })
  return(
     <div className="GlobalChatwrapper" >
        hello world bro
     </div>
  );
}
export default GlobalChat