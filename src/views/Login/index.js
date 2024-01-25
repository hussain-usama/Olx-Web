import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import '../styles/index.css';
import { loginUser } from '../../config/firebase';
import Loader from '../../components/Loader';

function Login() {

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState({ email: false, password: false })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setFormData(((prevState) => ({
      ...prevState,
      [name]: value
    })))
  }

  const login = async () => {
    setLoading(true)
    let response = await loginUser(formData)
    setLoading(false)
    if (response) {
      localStorage.setItem('token',true)
      navigate('/')
    }
  }
  return (
    <div className="authenticationCards" >
      {loading && <Loader open={loading} />}
      <Card sx={{ minWidth: 382 }}>
        <CardContent>
          <h1 style={{ marginTop: '0px' }}>Login</h1>
          <hr />
          <div className='authCardsStyle'>
            <div>
              <TextField
                size="small"
                className='authTextFields'
                error={formErrors.email}
                onChange={handleChange}
                name='email'
                helperText={formErrors.email ? `email is required!` : ''}
                label="Email" />
              <br />
              <TextField
                size="small"
                className='authTextFields'
                error={formErrors.password}
                onChange={handleChange}
                name='password'
                helperText={formErrors.password ? `password is required!` : ''}
                label="Password"
                type='password' />
            </div>
            <Button className='loginRegisterBtn' onClick={login}>
              Login
            </Button>
            <div className='haveAccount'>
              <p >Didn't Have an account?
                <button className='nothaveAccount' onClick={() => navigate('/register')}>Register</button></p>
              <hr />
              <span style={{ fontWeight: 'bold' }}>OR Join Via</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <Button className='facebookLogin'>facebook</Button>
              <Button className='googleLogin'>Google</Button>
            </div>
          </div>

        </CardContent>

      </Card>
    </div>
  );
}

export default Login;
