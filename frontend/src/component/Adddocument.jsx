import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'

export default function Adddocument() {
    const formik= useFormik({
        initialValues:{
            name:'',
            documentType:'',
            description:''
        },
        validationSchema:Yup.object({
            name:Yup.string().max(48).required(),
            documentType:Yup.string().required(),
            description:Yup.string().required()
        }),
        onSubmit:async (values , {resetForm})=>{
          try{
            await axios.post("http://localhost:4000/documents", values);
            console.log("Données envoyées avec succès :", values);
            resetForm()
            window.location.replace('/alldocument')
          } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
          }
        }
    })
  return (
    <div>
      <h1 className='mt-5 mb-5'>Add document</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row justify-content-center align-items-center mb-3">
       <div className="col-2">
       <label htmlFor="name" className='form-label mb-0'>Name :</label>
       </div>
        <div className="col-4">
        <input type="text" 
        name='name' 
        id='name' 
        value={formik.values.name}
        className='form-control mb-0' 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        </div>
        {formik.errors.name && formik.touched.name ? <div className='text-danger'>{formik.errors.name}</div>: null}
        </div>
        <div className="row justify-content-center align-items-center mb-3">
       <div className="col-2">
       <label htmlFor="documentType" className='form-label mb-0'>documentType :</label>
       </div>
        <div className="col-4">
        <select className="form-select" aria-label="Default select example" name='documentType' id='documentType' 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.documentType}
        
        >
            <option value="pdf" >PDF</option>
            <option value="txt">TXT</option>
            <option value="xdoc">XDOC</option>
        </select>
        </div>
        {formik.errors.documentType && formik.touched.documentType ? <div className='text-danger'>{formik.errors.documentType}</div>: null}
        </div>
        <div className="row justify-content-center align-items-center mb-3">
       <div className="col-2">
       <label htmlFor="description" className='form-label mb-0'>Description :</label>
       </div>
        <div className="col-4">
        <textarea type="text" name='description' id='description' className='form-control mb-0 resize-none' value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        </div>
        {formik.errors.description && formik.touched.description ? <div className='text-danger'>{formik.errors.description}</div>: null}
        </div>
        <button className="btn btn-primary" type='submit'>Add</button>
      </form>
    </div>
  )
}
