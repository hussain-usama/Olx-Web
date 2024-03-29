import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Ads from '../../assets/Ads.png'
import Categories from '../../assets/Categories.png'
import { getProducts } from "../../config/firebase";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch } from "react-redux";
import { setCartList } from "../../redux/Reducers/CartReducer";

function OlxProducts() {

  const [allProducts, setAllProducts] = useState([])
  const navigate = useNavigate()
  const dispatch=useDispatch()
  useEffect(() => {
    (async () => {
      let response = await getProducts()
      let mergeRespose=response.map(item=> {
        return {...item.data, id: item.id}
      })
      console.log(mergeRespose, 'all products with id')
      setAllProducts([...mergeRespose])
    })()
  }, [])

  const showProductDetails=(id)=>{
    navigate(`/productDetails/${id}`)
  }

  const addtoCart=(item)=>{
    dispatch(setCartList(item))
  }
  return (
    <div className="olxProductsMain">
      <Header />
      <img src={Ads} style={{ marginTop: '1rem' }} />
      <img src={Categories} style={{ marginTop: '1rem' }} />

      <div style={{display:'grid', gap:'50px 50px' , gridTemplateColumns:'auto auto auto auto', margin:'3rem', cursor:'pointer'}}>
        {allProducts?.length ?
          allProducts.map((item) => {
            return (
                <Card sx={{ maxWidth: 345 }} key={item.id}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={item?.imageUrl ? item.imageUrl : ''}
                    title="product image"
                    onClick={()=>showProductDetails(item.id)}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item?.title ?? ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item?.descr ?? ''}
                    </Typography>
                  </CardContent>
                    <div >
                      <Button size="small"> Price : Rs / {item?.price}</Button>
                    </div>
                    <div style={{display:'flex',alignItems:'center', height:'70px', justifyContent:'space-around', width:'100%'}}>
                      <Button style={{background:'white', color: 'black', border:'1px solid black'}}>Purchase</Button>
                      <Button style={{background:'white', color: 'black', border:'1px solid black'}} onClick={()=>addtoCart(item)}>Add to Cart</Button>
                    </div>
                </Card>
            )
          })
          : null
        }
      </div>

    </div>
  );
}

export default OlxProducts;
