import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnWrapper =styled.div`
  display:grid;
  grid-template-columns:1.2fr 0.8fr;
  gap:40px;
  margin-top:40px;
`

const Box= styled.div`
  background-color:#fff;
  border-radius:10px;
  padding:30px;
`
const ProductInfocell = styled.td`
  paddin:10px 0;
`

const ProductImageBox=styled.div`
  max-width:100px;
  max-height:100px;
  padding:10px;
  background-color:#f0f0f0;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  img{
    max-width:80px;
    max-height:80px;
  }
`

const CityHolder= styled.div`
  display:flex;
  gap:5px;
`

const QuantityLabel = styled.span`
  padding:0 3px;
`
export default function Cart() {
    const {cartProducts,addProduct, removeProduct, clearCart} = useContext(CartContext)
    const [products, setProducts] = useState([]);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [city,setCity]=useState('');
    const [postalCode,setPostalCode]=useState('');
    const [address,setAddress]=useState('');
    const [isSuccess, setIsSuccess]=useState(false)
    useEffect(()=>{
        if(cartProducts.length>0){
            axios.post('/api/cart',{ids:cartProducts})
            .then(response=>{
                setProducts(response.data)
            })
        }else{
          setProducts([])
        }
},[cartProducts])

useEffect(()=>{
  if(typeof window === 'undefined'){
    return;
  }
  if(window.location.href.includes('success')){
    clearCart();
    setIsSuccess(true)
  }
},[])

function moreThisProduct(id){
  addProduct(id)
}
function lessThisProduct(id){
  removeProduct(id)
}

let total=0;
for (const productId of cartProducts){
  const price=products.find(p=>p._id===productId)?.price || 0;
  total+=price;
}
async function goToPayment(){
  const response = await axios.post('/api/checkout',
  {name, email,city,postalCode,address,
  cartProducts,
  }
  )
  if(response.data.url){
    window.location=response.data.url
  }
}

if(isSuccess){
  return(
    <>
      <Header/>
      <Center>
       <ColumnWrapper>
        <Box>
          <h1>Thanks for your Order</h1>
          <p>We will email your order will be sent.</p>
        </Box>
       </ColumnWrapper>
      </Center>
    </>
  )
}
    return (
        <>
          <Header/>
          <Center>
            <ColumnWrapper>
              <Box>
                {!cartProducts?.length && (
                    <div>Your cart is empty</div>
                )}
                {cartProducts?.length>0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                
                <tbody>
                
                      {products.map(product=>(
                        <tr>
                        <ProductInfocell>
                          <ProductImageBox>
                            <img src="https://images.squarespace-cdn.com/content/v1/6065dbd423870765d7cc67cf/1683108945881-VVJ6A7Q3O24XM13B2B2L/macbook+pro+i7+10th+gen.png?format=1000w"/>
                          </ProductImageBox>
                          
                          {product.title} 
                          </ProductInfocell>
                        <td>
                          <Button onClick={()=> lessThisProduct(product._id)}>-</Button>
                          <QuantityLabel>{cartProducts.filter(id=>id===product._id).length}</QuantityLabel>
                          
                          <Button onClick={()=>moreThisProduct(product._id)}>+</Button>
                          </td>
                        <td>₹{cartProducts.filter(id=>id===product._id).length*product.price}</td>
                        </tr>
                      ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>₹{total}</td>
                  </tr>
                </tbody>
                </Table>
                )}
              </Box>
              {!!cartProducts?.length && (
                <Box>
                <h2>Order Information</h2>
                
                <Input type="text" placeholder="Name" value={name} onChange={ev=>setName(ev.target.value)} name="name"/>
                <Input type="email" placeholder="Email" value={email} onChange={ev=>setEmail(ev.target.value)} name="email"/>
                <CityHolder>
                <Input type="text" placeholder="City" value={city} onChange={ev=>setCity(ev.target.value)} name="city"/>
                <Input type="text" placeholder="Postal Code" value={postalCode} onChange={ev=>setPostalCode(ev.target.value)} name="postalCode"/>
                </CityHolder>
                <Input type="text" placeholder="Address" value={address} onChange={ev=>setAddress(ev.target.value)} name="address"/>
                
                <Button black block primary onClick={goToPayment}>Continue to Payment</Button>
                
              </Box>
              )}
              
            </ColumnWrapper>
          </Center>
        </>
    )
}