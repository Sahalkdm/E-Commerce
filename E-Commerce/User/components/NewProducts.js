import styled from "styled-components"
import Center from "./Center"
import ProductBox from "./ProductBox"
import ProductGrid from "./ProductGrid"

const Title=styled.h2`
  font-size:2rem;
  margin:0;
  margin-top:5px;
  font-weight:normal;
`

export default function NewProducts({products}){
    return(
        <Center>
          <Title>New Arrivals</Title>  
        <ProductGrid products={products}/>
        </Center>
    )
}