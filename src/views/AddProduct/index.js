import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { generateViewUrl } from '../../utils/helperFunctions';
import { useEffect, useState } from 'react';
import { VisuallyHiddenInput } from '../Profile';
import './index.css'
import { addProductToDb } from '../../config/firebase';
import Loader from '../../components/Loader';
import Maps from '../../components/Maps';

function AddProduct() {

  const [productInfo, setProductInfo] = useState({ title: '', descr: '', price: '', adImage: '' })
  const [imageUrl,setImageUrl]=useState([])
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()

  const handleChange = (e) => {
      let name = e.target.name
      let value
      if (name === 'adImage') {
          value = e.target.files[0]
          const getFiles = generateViewUrl(e)
          setImageUrl(getFiles)
      } else {
          value = e.target.value
      }
      setProductInfo(((prevState) => ({
          ...prevState,
          [name]: value
      })))
  }

  const saveProducts=async()=>{
    setLoading(true)
    await addProductToDb(productInfo)
    setLoading(false)
    navigate('/')
  }

  return (
    <>
    {loading && <Loader open={loading}/>}
    <div className='postAddMain'>
         <div className="postAddSubMMain">
       <h3>POST YOUR AD</h3>
       <div>
      
        <TextField
            id="outlined-basic"
            placeholder=''
            label="Ad Title"
            variant="outlined"
            value={productInfo.title}
            onChange={handleChange}
            className="postAddFields"
            name='title'
          />
          <br/>
          <TextField
            id="outlined-basic"
            placeholder=''
            label="Description"
            variant="outlined"
            value={productInfo.descr}
            onChange={handleChange}
            className="postAddFields"
            name='descr'
          />
           <br/>
           <TextField
            id="outlined-basic"
            placeholder=''
            label="Price"
            variant="outlined"
            value={productInfo.price}
            onChange={handleChange}
            className="postAddFields"
            name='price'
          />
          <br/>
          <Button  className='uploadButton' style={{width:'500px'}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload Product
              <VisuallyHiddenInput type="file" accept="image/*" name='adImage' onChange={handleChange} />
          </Button>
          <br/>
          {imageUrl?.length ?
            <img  src={imageUrl.map(x=>x)} className='productImageStyle'/>
            :
            null
          }

          <div style={{marginTop:'1rem'}}>
              <Button component="label" style={{background:'black', color: 'white', border:'1px solid black', width:'250px', marginRight:'10px'}}  onClick={saveProducts}>
                  Save
              </Button>
              <Button component="label" style={{background:'white', color: 'black', border:'1px solid black', width:'250px'}} onClick={()=>navigate('/')}>
                  Cancel
              </Button>
         
          </div>
          <div className='map-on-products'>
             <Maps/>
          </div>
       </div>
    </div>
    </div>
    </>

  );
}

export default AddProduct;
