import React, { useState } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import TableMines from '../Tablesmines'
const Coalmines = () => {
  return (
    <div>
      <Sidebar/>
      <div className="main-content">
        <Header/>
        <TableMines/>
      </div>
    </div>
  )
}

export default Coalmines