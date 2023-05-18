import React, { useEffect } from "react";
import { useRouter } from "next/router";

function GlobalChat():React.ReactElement{
  const route = useRouter();
  useEffect(()=>{
  })
  return(
     <div className="GlobalChatwrapper" >
        hello world bro
     </div>
  );
}
export default GlobalChat