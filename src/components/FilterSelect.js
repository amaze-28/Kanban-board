import React, { useState } from 'react'
import "../styles/FilterSelect.css"
import { AiOutlineBars, AiOutlineDown } from 'react-icons/ai';

const FilterSelect = ({groupBy, setGroupBy, orderBy, setOrderBy}) => {
  const [visible, setVisible] = useState(false);
  const openDropdown = () =>{
    setVisible(!visible);
  }
  return (
    <div className="dropdown">
         <div className='filtericon'>
            <AiOutlineBars />
         </div>
    <button className="dropbtn">Display</button>
    {visible && <div className="dropdown-content">
        <div className='grouping-sub1'>
          <div className='dropdown-options'>
            Grouping
          </div>
          <div className='grouping-sub1-select'>
            <select className='grouping-ordering' value={groupBy} onChange={(e)=>setGroupBy(e.target.value)}>
            <option value="status">Status</option>
            <option value="userId">User</option>
            <option value="priority">Priority</option>
          </select>
          </div>
        </div>
        {/* ordering */}
        <div className='grouping-sub1'>
        <div className='dropdown-options'>
            Ordering
          </div>
          <div className='grouping-sub1-select'>
            <select className='grouping-ordering' value={orderBy} onChange={(e)=>setOrderBy(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
          </div>
        </div>
    </div> }
    
    <button className='dropdown-button' onClick ={openDropdown}><AiOutlineDown /></button>
    
    </div>
  )
}



export default FilterSelect