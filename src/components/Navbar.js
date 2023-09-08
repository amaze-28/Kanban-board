import React from 'react'
import "../styles/Navbar.css"
import FilterSelect from './FilterSelect'

const Navbar = ({groupBy, setGroupBy, orderBy, setOrderBy}) => {
  return (
    <div className='navbar'>
        <FilterSelect groupBy={groupBy} setGroupBy={setGroupBy} orderBy={orderBy} setOrderBy={setOrderBy}/>
    </div>
  )
}

export default Navbar