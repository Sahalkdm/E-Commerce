import Center from "@/components/Center";
import Header from "@/components/Header";
//import Title from "@/components/Title";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
//import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/Cart";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

const Title=styled.h1`
  font-size:1.5rem;
`

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({product}) {
  const {addProduct} = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
        <WhiteBox>
                <img style={{maxWidth:"100%"}}   src="https://images.squarespace-cdn.com/content/v1/6065dbd423870765d7cc67cf/1683108945881-VVJ6A7Q3O24XM13B2B2L/macbook+pro+i7+10th+gen.png?format=1000w"/>
              </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <Button green outline onClick={() => addProduct(product._id)}>
                  <CartIcon />Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}

/*import Center from "@/components/Center";
import Header from "@/components/Header";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Title=styled.h1`
  font-size:1.5rem;
`

const ColWrapper=styled.div`
  display:grid;
  grid-template-columns:0.8fr 1.2fr;
  gap:40px;
  margin-top:40px;
`

export default function ProductInfo({product}){
    return(
        <>
          <Header/>
          <Center>
            <ColWrapper>
              <WhiteBox>
                <img style={{maxWidth:"100%"}}   src="https://images.squarespace-cdn.com/content/v1/6065dbd423870765d7cc67cf/1683108945881-VVJ6A7Q3O24XM13B2B2L/macbook+pro+i7+10th+gen.png?format=1000w"/>
              </WhiteBox>
              <div>
                <Title>{product.title}</Title>
              </div>
            </ColWrapper>
            
          </Center>
        </>
    )
}

export async function getServerSideProps(context){
    mongooseConnect();
    const {id} = context.query
    const product=await Product.findById(id)
    return{
        props:{
            product:JSON.parse(JSON.stringify(product)),
        }
    }
}*/