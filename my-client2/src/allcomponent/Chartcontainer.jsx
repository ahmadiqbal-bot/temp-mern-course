import { useState } from "react"
import Areacontainer from "./Areacontainer"
import Barcontainer from "./Barcontainer"
import Wrapper from "../assets/wrappers/ChartsContainer"



const Chartcontainer = ({data}) => {
    const[barchat,setbarchat]= useState(true)
  return (
    <Wrapper>
<h4>Monthy application</h4>
<button type="button" onClick={()=>setbarchat(!barchat)}>
{barchat?'Area chat':'bar Chat' }

</button>
{barchat?<Areacontainer data={data}/>:<Barcontainer data={data}/>}
    </Wrapper>
  )
}

export default Chartcontainer