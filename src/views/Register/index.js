import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import '../styles/index.css';
import { register } from '../../config/firebase';
import Loader from '../../components/Loader';

function Register() {

  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
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

  const registerUser = async () => {
    setLoading(true)
    let response = await register(formData)
    setLoading(false)
    if (response) {
      navigate('/')
    }
  }

  return (
    <div className="">
     {loading && <Loader open={loading}/>}
      <div className="authenticationCards">
        <Card sx={{ minWidth: 382 }}>
          <CardContent>
            <h1 style={{ marginTop: '0px' }}>Register</h1>
            <hr />
            <div className='authCardsStyle'>
              <div>
                <TextField
                  size="small"
                  className='authTextFields'
                  error={formErrors.name}
                  onChange={handleChange}
                  name='name'
                  label="Full Name" />
                <br />
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
              <Button className='loginRegisterBtn' onClick={registerUser} >
                Register
              </Button>
              <div className='haveAccount'>
                <p >Already Have an account?
                  <button className='nothaveAccount' onClick={() => navigate('/login')}>Login</button></p>
              </div>

            </div>

          </CardContent>

        </Card>
      </div>
    </div>
  );
}

export default Register;
