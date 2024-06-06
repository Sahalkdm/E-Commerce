import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";

const StyledHeader = styled.header`
  background-color: #222;

`;
const Logo = styled.a`
  color:#fff;
  text-decoration:none;
`
const Wrapper = styled.div`
  display:flex;
  justify-content:space-between;
  padding:30px 0;
`
const NavLink = styled(Link)`
  color:#aaa;
  text-decoration:none;
`
const StyledNav = styled.nav`
 display:flex;
 gap:15px;
 @media only screen and (max-width: 600px){
  display:none;
 }
`

const NavButton=styled.button`
  background-color:transparent;
  width:30px;
  height:30px;
  border:0;
  color:white;
  curser:pointer;

`
export default function Header() {
  const {cartProducts}=useContext(CartContext);
    return(
        <StyledHeader>
            <Center>
                <Wrapper>
            <Logo href={'/'}>Ecommerce</Logo>
            <StyledNav>
                <NavLink href={'/'}>Home</NavLink>
                <NavLink href={'/products'}>All Products</NavLink>
                <NavLink href={'/categories'}>Categories</NavLink>
                <NavLink href={'/account'}>Account</NavLink>
                <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
            </StyledNav>
            {/*<BarsIcon/>*/}
            </Wrapper>
            </Center>
        </StyledHeader>
    )
}