import React from 'react'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StateItem from './StateItem';

const StatsContainer = ({defaultjob}) => {
    const stats= [
    {title:'pending application',
    count:defaultjob?.pending ||0,
    icon:<FaSuitcaseRolling/>,
    color:'#f59e0b',
    bcg:'#fef3c7'
},
{title:'interview sheduded',
count:defaultjob?.interview ||0,
icon:<FaCalendarCheck/>,
color:'#00aa09',
bcg:'#fef3c7'
},
{title:'declined',
count:defaultjob?.declined ||0,
icon:<FaBug/>,
color:'#f32400',
bcg:'#fef3c7'
}
    ]
  return ( 
     <Wrapper>
    {
        stats.map((item)=>{
            return <StateItem key={item.title} {...item}/>
        })
    }
    
  </Wrapper>
  )
}

export default StatsContainer