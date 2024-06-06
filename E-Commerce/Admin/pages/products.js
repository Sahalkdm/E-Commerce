import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Products() {
  const [products, setProducts] = useState([])
  useEffect(()=>{
    axios.get('/api/products').then(response => {
      setProducts(response.data)
    })
  },[])
  console.log(products);
  return <Layout>
    <Link className="bg-gray-300 rounded-md py-1 px-2" href={'/products/new'}>Add New Product</Link>

    <table className="basic mt-2">
      <thead>
        <tr>
          <td>Product Name</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product.title}</td>
            <td>
              <Link className="btn-primary" href={'/products/edit/'+product._id}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>

                Edit</Link>
                <Link href={'/products/delete/'+product._id} className="btn-danger mt-0">
                  Delete
                </Link>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </Layout>
}
