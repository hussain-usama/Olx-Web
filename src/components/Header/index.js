import Logo from '../../assets/Logo.png'
import SellButton from '../../assets/SellButton.png'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './index.css'
import { onAuthStateChanged } from 'firebase/auth';
import React,{ useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import HeaderMenu from '../Menu';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';

const dropdownList=[
  { label: 'Pakistan'},
  { label: 'Sindh, Pakistan'},
  { label: 'Punjab, Pakistan'},
  { label: 'AZK, Pakistan'},
  { label: 'KPK, Pakistan'},
  { label: 'Balochistan, Pakistan'},
]
function Header() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate=useNavigate()
  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log('Logged in',user)
            setUser(user)
          } else {
            console.log('Logged out',user)
            setUser(null)
          }
          setLoading(false)
        });
  }, []);

    return (
      <>
        {loading && <Loader open={loading}/>}
        <div className="headerMain" >
            <img src={Logo}/>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              className='headerDropdown'
              options={dropdownList}
              defaultValue={'Pakistan'}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
            <TextField id="outlined-basic" className='searchField' placeholder='Find Cars, Mobile Phones and more' label="" variant="outlined" />
            {user?.email ? <HeaderMenu user={user}/> : <p className='loginText' onClick={()=>navigate('/login')}>login</p>}
            <img src={SellButton} style={{cursor:'pointer'}} onClick={()=>navigate('/addProduct')}/>
        </div>
      </>
    );
  }
  
  export default Header;
  