import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi"
import { useState } from 'react';

import '../App.css';


const DropDown = ({ toggle, sortBy, onSortByChange}) => {
  if (!toggle) {
    return null;
  }
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div onClick={() => onSortByChange('Name')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Item Name {(sortBy === 'Name') 
          // && <BiCheck />
          }</div>
        <div onClick={() => onSortByChange('Dep')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Department Name {(sortBy === 'Dep') 
          // && <BiCheck />
          }</div>
      </div>
    </div>
  )
}

const Search = ({ query, onQueryChange}) => {
  return (
  
      
       
        <input type="text" name="query" id="query" value={query}
          onChange={(event) => { onQueryChange(event.target.value) }}
          className="s" placeholder="Search" />


  )
}

export default Search