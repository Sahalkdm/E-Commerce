import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios"
import { withSwal } from 'react-sweetalert2';

 function Categories({swal}) {
    const [editedCategory, setEditedCategory]=useState(null)
    const [name,setName]=useState('');
    const [parentCategory, setParentCategory]=useState('')
    const [categories, setCategries]=useState([])
    const [properties, setProperties]=useState([])
    useEffect(()=>{
        fetchCategories()
    },[])
    function fetchCategories(){
        axios.get('/api/categories').then(results=>{
            setCategries(results.data)
        })
    }
    async function saveCategory (ev) {
        ev.preventDefault();
        const data= {
            name, 
            parentCategory,
            properties:properties.map(p=>({
                name:p.name,
                values:p.values.split(',')
            }))}
            console.log(data);
        if(editedCategory){
            await axios.put('/api/categories',{...data,_id:editedCategory._id})
            setEditedCategory(null)
        }else{
            await axios.post('/api/categories',data)
        }
       
       setName('');
       setParentCategory('');
       setProperties([])
       fetchCategories();
    }
    function editCategory(category){
        setEditedCategory(category)
        setName(category.name);
        setParentCategory(category.parent?._id);
        setProperties(category.properties.map(({name,values})=>({
            name,
            values:values.join(',')
        })))
    }
    function deleteCategory(category) {
        swal.fire({
            title: 'Are you sure?',
            text: `Do want to delete ${category.name} ?`,
            showCancelButton: true,
            cancelbuttonTitle: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButton: 'true',
           
        }).then(async result => {
            if(result.isConfirmed){
                const {_id}=category
               await axios.delete('/api/categories?_id='+_id)
               fetchCategories();
            }
            console.log({result})
        }).catch(error => {
            // when promise rejected...
        });
    }

    function addProperty() {
        setProperties(prev => {
            return[...prev, {name:"",values:''}]
        })
    }
    function updatePropertyName(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name=newName;
            return properties
        })
        console.log(index,property,newName);
    }
    function updatePropertyValue(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev]; 
            properties[index].values=newName;
            return properties
        })
        console.log(index,property,newName);
    }

    function removeProperty(index){
        setProperties(prev => {
           // const properties;
            const newProperties=[...prev].filter((p,pIndex)=>{
                return pIndex !== index;
            })
            return newProperties;
        })
    }
    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? 'Edit Category' : 'New Category Name'}</label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">
                <input 
              className="" 
              type="text" 
              placeholder={'Category Name'} 
              onChange={ev=>setName(ev.target.value)}
              value={name}/>
              <select className="" value={parentCategory} onChange={ev=>setParentCategory(ev.target.value)}>
                <option value="">No parent category</option>
                {categories.length>0 && categories.map(category =>(
                
                            <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
              </select>
                </div>

                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button type="button" className="btn-default text-sm" onClick={addProperty}>Add New</button>
                    {properties.length > 0 && properties.map((property,index) =>(
                      <div className="flex gap-1 mb-2">
                        <input className="mb-0" type="text" value={property.name} placeholder="Property Name" onChange={(ev)=>updatePropertyName(index,property,ev.target.value)}/>
                        <input className="mb-0" type="text" value={property.values} placeholder="values, comma seperated" onChange={(ev)=>updatePropertyValue(index,property,ev.target.value)}/>

                        <button type="button" className="btn-default" onClick={()=>removeProperty(index)}>Remove</button>
                      </div>
    
                    ))}
                </div>

            <div className="flex gap-1">
            {editedCategory && (
                <button type="button" className="btn-default" 
                onClick={()=>{
                    setEditedCategory(null);
                    setName("");
                    setParentCategory("");
                    setProperties([])
                }}>Cancel</button>
            )}
            <button type="submit" className="btn-primary py-1">Save</button>
            </div>
            </form> 
            {!editedCategory && (
                <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Category</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length>0 && categories.map(category =>(
                        <tr>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <button onClick={()=>editCategory(category)} className="btn-primary mx-1">
                                    Edit
                                    </button>
                                <button onClick={()=>deleteCategory(category)} className="btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            
        </Layout>
    )
}

export default withSwal(({swal},ref)=>(
    <Categories swal={swal}/>
))