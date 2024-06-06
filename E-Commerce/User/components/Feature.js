import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color:#222;
  color:#fff;
  padding:50px 0;
`

const Title= styled.h1`
  margin:0;
  font-weight:normal;
  font-size:3rem;

`
const Desc = styled.p`
  color:#aaa;
  font-size:0.8rem;
`
const ColumnWrapper= styled.div`
  display:grid;
  grid-template-columns:1.1fr 0.9fr;
  gap:40px;
  img{
    max-width:100%;
    max-height:250px
  }
`;
const ButtonsWrapper = styled.div`
  display:flex;
  gap:10px;
  margin-top:25px;
`
const Column = styled.div`
  display:flex;
  align-items:celter;
  flex-direction:;
`

export default function Feature ({product}) {
    const {setCartProducts,addProduct}= useContext(CartContext)
    function addFeaturedToCart(){
      addProduct(product._id)
    }

    return (
        <Bg>
            <Center>
                <ColumnWrapper>
                    <Column>
                    <div>
            <Title>{product.title}</Title>
            <Desc>{product.description}</Desc>
                <ButtonsWrapper>
                <ButtonLink href={'/product/'+product._id} white={1} outline={1} >Read More</ButtonLink>
                <Button primary={1} onClick={addFeaturedToCart}>
                <CartIcon />
                  Add to Cart</Button>
                </ButtonsWrapper>
                </div>
                </Column>
                <div>
                    <img src="https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/20181018/e96b89bba7f56561956a761d65baecf4.png"></img>
                </div>
                </ColumnWrapper>
            </Center>
        </Bg>
    )
}