import { useEffect, useState } from "react";
import axios from "axios"
import { useRouter } from "next/router";


export default function ProductForm({
    _id,
    title:existingTitle, 
    description:existingDescription,
    price:existingPrice,
    category:existingCategory,
    properties:assignedProperties,
  images }) {
    const [title, setTitle]=useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice]  = useState(existingPrice || '');
    const [gotoProducts, setGotoProducts]=useState(false);
    const [categories, setCategories]=useState([]);
    const [category,setCategory]=useState(existingCategory || '');
    const [productProperties,setProductProperties]=useState(assignedProperties || {})
    const router = useRouter();
    useEffect(()=>{
      axios.get('/api/categories').then(result=>{
        setCategories(result.data);
      })
    },[])
    async function saveProduct(ev) {
        ev.preventDefault();
        const data={title,description,price,category, 
          properties:productProperties};
        
        if (_id) {
            await axios.put('/api/products',{...data,_id})
        }else{
            await axios.post('/api/products', data);
        }
        setGotoProducts(true)
        }
    if (gotoProducts){
      router.push('/products')
    }
    async function uploadImages(ev) {
      const files=ev.target?.files
      if(files?.length>0){
        const data= new FormData();
        for (const file of files){
          data.append('file', file);
        }
        const res = await axios.post('/api/upload', data, {
          headers:{'Content-Type':'multipart/form-data'}
        })
        console.log(res.data);
      }
    }

    const propertiesToFill=[]
    if(categories.length >0 && category){
      let selCatInfo=categories.find(({_id})=>_id===category)
      console.log(selCatInfo)
      propertiesToFill.push(...selCatInfo.properties)
      while(selCatInfo?.parent?._id){
        const parentCat=categories.find(({_id})=>_id===selCatInfo?.parent?._id)
        propertiesToFill.push(...parentCat.properties)
        selCatInfo=parentCat
      }
    }

    function setProductProp(propName, value){
      setProductProperties(prev => {
        const newProductProps = {...prev}
      newProductProps[propName]=value
      return newProductProps
      })
      
    }
    return (
            <form onSubmit={saveProduct} >

            <label>Product Name</label>
            <input 
              type="text" 
              placeholder="product name" 
              value={title}
              onChange={ev => setTitle(ev.target.value)} />
              <label>Category</label>
              <select value={category} onChange={ev=>setCategory(ev.target.value)}>
                <option value="" >Uncategorized</option>
                {categories.length>0 && categories.map(c=>(
                  <option value={c._id}>{c.name}</option>
                ))}
              </select>

              {propertiesToFill.length>0 && propertiesToFill.map(p=>  (
                <div className="flex gap-1">
                  <div>{p.name}</div>
                  <select value={productProperties[p.name]} onChange={(ev)=>{setProductProp(p.name,ev.target.value)}}>
                    {p.values.map(v=>(
                      <option value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              ))}

              <label>
                Photos 
              </label>
              <div className="mb-2">
                <label className="w-32 h-32 border text-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-300 flex items-center justify-center">
                  Upload 
      
                <input type="file" className="hidden" onChange={uploadImages}></input>
                </label>
                {!images?.length && (
                  <div>
                    No photos for this product
                  </div>
                )}
              </div>
            <label>Description</label>
            <textarea 
               placeholder="description"
               value={description}
               onChange={ev => setDescription(ev.target.value)}/>
            <label>Price</label>
            <input 
              type="number" 
              placeholder="price"
              value={price}
              onChange={ev => setPrice(ev.target.value)}/>
            <button type="submit" className="btn-primary">Save</button>
            </form>
                )
}