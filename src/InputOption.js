import React from 'react'
import './InputOption.css'

function InputOption({ Icon, title, color }) {
  return (
    <div className='inputOption'>
        <Icon style={{ color: color }} />
        <p className='inputOption__title'>{title}</p>
    </div>
  )
}

export default InputOption