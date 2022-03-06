import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import ChatIcon from '@material-ui/icons/Chat'
import NotificationsIcon from '@material-ui/icons/Notifications'
import HeaderOptions from './HeaderOptions'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from './features/counter/userSlice'
import { getAuth, signOut } from "firebase/auth";

function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const logoutOfApp = () => {
        console.log("xxx")
        dispatch(logout())
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }

  return (
    <header className='header'>
        
        <div className='header__left'>
            <img 
                alt='linkedin_icon' 
                src='/linkedin-svg.svg'
            />
            <div className='header__search'>
                <SearchIcon />
                <input type='text' />
            </div>

        </div>
        
        <nav className='header__right'>
            <HeaderOptions Icon={HomeIcon} title='Home' />
            <HeaderOptions Icon={SupervisorAccountIcon} title='My Network' />
            <HeaderOptions Icon={BusinessCenterIcon} title='Jobs' />
            <HeaderOptions Icon={ChatIcon} title='Messaging' />
            <HeaderOptions Icon={NotificationsIcon} title='Notifications' />
            <HeaderOptions avatar={user && (user.photoURL || 'empty')} title={user ? user.displayName : 'unregistered'} onClick={logoutOfApp}/>
        </nav>
    </header>
  )
}

export default Header