import { Avatar } from '@material-ui/core'
import React from 'react'
import './HeaderOptions.css'

function HeaderOptions({avatar, title, Icon, onClick}) {
  return (
    <button onClick={onClick} className='headerOptions'>
        {Icon && <Icon className='headerOption__icon' />}
        {(avatar || avatar === 'empty') && (
            <Avatar className='headerOptions__icon' src={avatar}>{title.charAt(0)}</Avatar>
        )}
        <span className='headerOptions__title'>{title}</span>
    </button>
  )
}

export default HeaderOptions