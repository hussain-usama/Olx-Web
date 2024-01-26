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
import Grid from '@mui/material/Grid';

function OlxProducts() {

  const [allProducts, setAllProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      let response = await getProducts()
      console.log(response, 'all products')
      setAllProducts([...response])
    })()
  }, [])

  return (
    <div className="olxProductsMain">
      <Header />
      <img src={Ads} style={{ marginTop: '1rem' }} />
      <img src={Categories} style={{ marginTop: '1rem' }} />

      <div style={{display:'grid', gap:'50px 50px' , gridTemplateColumns:'auto auto auto auto', margin:'3rem', cursor:'pointer'}}>
        {allProducts?.length &&
          allProducts.map((item, index) => {
            return (
                <Card sx={{ maxWidth: 345 }} key={index}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={item?.imageUrl ? item.imageUrl : ''}
                    title="product image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item?.title ?? ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item?.descr ?? ''}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"> Price : Rs / {item?.price}</Button>
                  </CardActions>
                </Card>
            )
          })
        }
      </div>

    </div>
  );
}

export default OlxProducts;
