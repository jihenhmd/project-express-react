import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import  axios  from 'axios';

export default function Adddocument() {
    const [document,setDocument]= useState({})
    const [name,setName]=useState('')
    const [documentType,setDocumentType]=useState()
    const [description,setDescription]=useState()
    const {id} = useParams()
    console.log(id)
    const fetchData = async ()=>{
        await axios.get(`http://localhost:4000/documents/${id}`)
        .then(async res=> await setDocument(res.data))
        .catch((err)=>console.log('error fetch ',err))
          setName(document.name)
          setDocumentType(document.documentType)
          setDescription(document.description)
    } 
    useEffect(()=>{
      fetchData()
    },[])
    const formik= useFormik({
        initialValues:{
            name:name,
            documentType:documentType,
            description:description
        },
        validationSchema:Yup.object({
            name:Yup.string().max(48).required(),
            documentType:Yup.string().required(),
            description:Yup.string().required()
        }),
        onSubmit:async (values , {resetForm})=>{
          await axios.put(`http://localhost:4000/documents/${id}`,values)
            resetForm()
            window.location.replace('/alldocuments')
        }
    }) 
  return (
    <div>
      <h1 className='mt-5 mb-5'>Update document</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row justify-content-center align-items-center mb-3">
       <div className="col-2">
       <label htmlFor="name" className='form-label mb-0'>Title :</label>
       </div>
        <div className="col-4">
        <input type="text" 
        name='name' 
        id='name' 
        value={name}
        className='form-control mb-0' 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        </div>
        {formik.errors.name && formik.touched.name ? <div className='text-danger'>{formik.errors.name}</div>: null}
        </div>
        <div className="row justify-content-center align-items-center mb-3">
       <div className="col-2">
       <label htmlFor="documentType" className='form-label mb-0'>Type :</label>
       </div>
        <div className="col-4">
        <select className="form-select" aria-label="Default select example" name='documentType' id='documentType' 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={documentType}
        defaultValue={formik.values.documentType}
        >
            <option value="pdf" >PDF</option>
            <option value="txt">TXT</option>
            <option value="Xdoc">XDOC</option>
        </select>
        </div>
        {formik.errors.documentType && formik.touched.documentType ? <div className='text-danger'>{formik.errors.documentType}</div>: null}
        </div>
        <div className="row justify-content-center align-items-center mb-3">
       <div className="col-2">
       <label htmlFor="description" className='form-label mb-0'>Description :</label>
       </div>
        <div className="col-4">
        <textarea type="text" name='description' id='description' className='form-control mb-0 resize-none' value={description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        </div>
        {formik.errors.description && formik.touched.description ? <div className='text-danger'>{formik.errors.description}</div>: null}
        </div>
        <button  className="btn btn-primary" type='submit'>Update</button>
      </form>
    </div>
  )
}
