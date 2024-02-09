import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "../../redux/Reducers/CartReducer";

function CartProducts() {

  const [allProducts, setAllProducts] = useState([])
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const { cartList } = useSelector(state=> state.cartSlice)
  console.log(cartList,'cartList')
  const showProductDetails=(id)=>{
    navigate(`/productDetails/${id}`)
  }

  const removeFromList=(item)=>{
    dispatch(removeCartItem(item))
  }

  return (
    <div className="olxProductsMain">
   <Header />
      <div style={{display:'grid', gap:'50px 50px' , gridTemplateColumns:'auto auto auto auto', margin:'3rem', cursor:'pointer'}}>
        {cartList?.length ?
          cartList.map((item) => {
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
                      <Button style={{background:'white', color: 'black', border:'1px solid black'}} onClick={()=>removeFromList(item)}>Remove from Cart</Button>
                    </div>
                </Card>
            )
          })
          : (
            <div>
              <h3>No Items Here...</h3>

            </div>
          )
        }
      </div>

    </div>
  );
}

export default CartProducts;
