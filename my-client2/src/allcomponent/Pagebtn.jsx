import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { usealljobcontext } from '../pages/AllJobs';

const Pagebtn = () => {
  const{data:{numofpages,currentPage}}= usealljobcontext();
const pages= Array.from({length:numofpages},(_,index)=>{
return index +1
})
const{search,pathname} = useLocation()
const navigate= useNavigate();
const handlepage=(allpages)=>{
const searchparams= new URLSearchParams(search)
searchparams.set('page',allpages)
navigate(`${pathname}?${searchparams.toString()}`)
}


const pagebuton= ({pagenumber,active})=>{
  return(
<button className={`btn page-btn ${active && 'active' } ` } key={pagenumber}>{pagenumber}</button>
)}

const renderpage=()=>{
  const pageButtons = [];

 
  pageButtons.push(
    pagebuton({ pagenumber: 1, active: currentPage === 1 })
  );
  if (currentPage > 3) {
    pageButtons.push(
      <span className='page-btn dots' key='dots-1'>
        ....
      </span>
    );
  }
  if (currentPage !== 1 && currentPage !== 2) {
    pageButtons.push(
      pagebuton({ pagenumber: currentPage - 1, active: false })
    );
  }


  if (currentPage !== 1 && currentPage !== numofpages) {
    pageButtons.push(
      pagebuton({ pagenumber: currentPage, active: true })
    );
  }

  if (currentPage !== numofpages && currentPage !== numofpages - 1) {
    pageButtons.push(
      pagebuton({ pageNumber: currentPage + 1, activeClass: false })
    );
  }
  if (currentPage < numofpages - 2) {
    pageButtons.push(
      <span className=' page-btn dots' key='dots+1'>
        ....
      </span>
    );
  }
  pageButtons.push(
    pagebuton({
      pagenumber: numofpages,
      active: currentPage === numofpages,
    })
  );

  return pageButtons;
};
  return (
    <Wrapper>
      <button className='btn pre-btn' onClick={()=>{
        let prev = currentPage - 1;
        if(prev <1) prev = numofpages;
        handlepage(prev)
      }}>
        <HiChevronDoubleLeft/>
        prev
      </button>
      <div className="btn-container">{renderpage()}</div>
      <button className='btn pre-btn'  onClick={()=>{
        let next = currentPage + 1;
        if(next > numofpages) next = 1;
        handlepage(next)
      }}>
        <HiChevronDoubleRight/>
        next
      </button>
    </Wrapper>
  )
}

export default Pagebtn