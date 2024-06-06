import styled from "styled-components"
import Button from "./Button";
import CartIcon from "./icons/Cart";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
  
`

const WhiteBox= styled(Link)`
  background-color:#fff;
  padding:20px;
  height:150px;
  text-align:center;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  img{
    max-width:100%;
    max-height:100px;
  }

`;

const Title= styled(Link)`
  font-weight:normal;
  font-size:0.9rem;
  margin:0;
  color:inherit;
  text-decoration:none;

`

const ProductInfoBox= styled.div`
  margin-top:10px;
  padding:0px 10px;
`
const PriceRow=styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-top:2px;
`

const Price=styled.div`
  font-size:1.2rem;
  font-weight:bold;
`
export default function ProductBox({_id,title,description,price}){
  const url= '/product/'+_id; 
  const {addProduct}=useContext(CartContext);
  return(
        <ProductWrapper>
        <WhiteBox href={url}>
            <div>
            <img src="https://images.squarespace-cdn.com/content/v1/6065dbd423870765d7cc67cf/1683108945881-VVJ6A7Q3O24XM13B2B2L/macbook+pro+i7+10th+gen.png?format=1000w" />
            </div>
        </WhiteBox>
        <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
        <Price>Rs. {price}</Price>
        <Button green outline onClick={()=>addProduct(_id)}>Add to Cart</Button>
        </PriceRow>
        </ProductInfoBox>
        </ProductWrapper>
    )
}