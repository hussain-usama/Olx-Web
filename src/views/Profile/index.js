import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { TextField } from '@mui/material';
import './index.css'
import { updateProfileToDb } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { generateViewUrl } from '../../utils/helperFunctions';

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function Profile({ user }) {
    const [profileInfo, setProfileInfo] = useState({ email: user?.email ? user?.email : '', name: '', age: '', profileImage: '', info: '' })
    const [imageUrl,setImageUrl]=useState([])
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    const handleChange = (e) => {
        let name = e.target.name
        let value
        if (name === 'profileImage') {
            value = e.target.files[0]
            const getFiles = generateViewUrl(e)
            setImageUrl(getFiles)
        } else {
            value = e.target.value
        }
        setProfileInfo(((prevState) => ({
            ...prevState,
            [name]: value
        })))
    }

    const saveProfile=async()=>{
        setLoading(true)
        await updateProfileToDb(profileInfo)
        setLoading(false)
        navigate('/')
    }
    return (
        <>
         {loading && <Loader open={loading}/>}
         <div className='profileMain'>
            <div className="profileSubMain">
                <h2>User Profile</h2>
                <div style={{ display: 'flex',justifyContent:'center' }}>
                    {imageUrl?.length ?
                        <img  src={imageUrl.map(x=>x)} className='profileImageStyle'/>
                        :
                        <Avatar alt={profileInfo?.email[0]} src="" />
                    }
                </div>
                <div style={{ display: 'flex',justifyContent:'center', margin:'1rem' }}>
                    <Button  className='uploadButton' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" accept="image/*" name='profileImage' onChange={handleChange} />
                    </Button>
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        className=''
                        placeholder=''
                        label="User Email"
                        variant="outlined"
                        value={profileInfo.email}
                        disabled
                        style={{width:'500px', marginBottom:'1rem'}}
                    />
                    <br />
                    <TextField
                        id="outlined-basic"
                        className=''
                        placeholder=''
                        label="User Name"
                        variant="outlined"
                        value={profileInfo.name}
                        onChange={handleChange}
                        name='name'
                        style={{width:'500px', marginBottom:'1rem'}}
                    />
                    <br />
                    <TextField
                        id="outlined-basic"
                        className=''
                        placeholder=''
                        label="Age"
                        variant="outlined"
                        value={profileInfo.age}
                        onChange={handleChange}
                        name='age'
                        style={{width:'500px', marginBottom:'1rem'}}
                    />
                    <br />
                    <TextField
                        id="outlined-basic"
                        label="Additional Info"
                        multiline
                        rows={4}
                        value={profileInfo.info}
                        onChange={handleChange}
                        name='info'
                        style={{width:'500px'}}
                    />
                    <br/>
                    <div style={{marginTop:'1rem'}}>
                        <Button component="label" style={{background:'black', color: 'white', border:'1px solid black', width:'250px', marginRight:'10px'}}  onClick={saveProfile}>
                            Save
                        </Button>
                        <Button component="label" style={{background:'white', color: 'black', border:'1px solid black', width:'250px'}} onClick={()=>navigate('/')}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </>

    );
}

export default Profile;
