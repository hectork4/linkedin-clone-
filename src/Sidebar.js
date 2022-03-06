import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import './Sidebar.css'

function Sidebar() {

    const user = useSelector(selectUser);

    const recentItem = (topic) => 
        <div className='sidebar__recentItem'>
            <span className='sidebar__hash'>
                #
            </span>
            <p>
                {topic}
            </p>
        </div>
    

  return (
    <div className='sidebar'>
        <div className='sidebar__top'>
            <img src='/herbsBanner3.jpg' alt='' />
            <Avatar className='sidebar__avatar' src={user.photoURL}>{user.displayName.charAt(0)}</Avatar>
            <h2 className='sidebar__title'>{user.displayName}</h2>
            <h4 className='sidebar__email'>{user.email}</h4>
        </div>

        <div className='sidebar__stats'>
            <div className='sidebar__stat'>
                <p>Who viewed you?</p>
                <p className='sidebar__statNumber'>2541</p>
            </div>
            <div className='sidebar__stat'>
                <p>Vies on post</p>
                <p className='sidebar__statNumber'>2541</p>
            </div>
        </div>

        <div className='sidebar__bottom'>
            <p>Recent</p>
            {recentItem('reactjs')}
            {recentItem('developers')}
            {recentItem('softwareEngineer')}
            {recentItem('cocina')}
        </div>
    </div>
  )
}

export default Sidebar