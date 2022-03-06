import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, logout, selectUser } from './features/counter/userSlice';
import Feed from './Feed';
import Header from './Header';
import Login from './Login';
import Sidebar from './Sidebar';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch(); 

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, userAuth => {
      // Check for user status
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoURL: userAuth.photoURL
        }))
      } else {
        dispatch(logout())
      }
    });
  }, [])

  return (
    <div className="App">
      {/* Header  */}
      <Header />
      {/* Body  */}
      {!user ? <Login /> : 
      <div className='app__body'>
        {/* Sidebar  */}
        <Sidebar />
        {/* Feed  */}
        <Feed />
      </div>
      }        
        {/* Widget  */}
    </div>
    )
}

export default App;
