/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import  axios  from 'axios';
import {  Link} from 'react-router-dom';


export default function Alldocument() {


  const [documents,setDocuments]= useState([])
  const fetchData = async ()=>{
    await axios.get('http://localhost:4000/documents')
    .then(res => setDocuments(res.data))
    .catch((err)=>console.log('error fetch ',err))
  }
  useEffect(()=>{
        fetchData()
  },[])
  const handleDelete=async (id)=>{
    await axios.delete(`http://localhost:4000/documents/${id}`)
    const newDocuments = documents.filter((document)=>{
      return document.id !== id
    })
    setDocuments(newDocuments)
  }
  const documentsJSX = documents.map((document)=>{
    return (
      <tr key={document.id}>

            <td>{document.name} </td>
            <td>{document.documentType}</td>
            <td>{document.description}</td>
            <td>
              <Link to={`/updatedocument/${document.id}`}className="btn btn-primary me-2">Update</Link>
              <button className="btn btn-danger"
              onClick={()=>{handleDelete(document.id)}}
              >Delete</button>
            </td>
          </tr>
    )
  })
  return (
    <div>
      <h1 className='mt-5 mb-5'>All Documents </h1>
      <table className="table">
        <thead>
        <tr>
        <th>Title</th>
        <th>Type</th>
        <th>Description</th>
        <th>Action</th>
        </tr>
        </thead>
        <tbody>
          {documentsJSX}
        </tbody>
      </table>
    </div>
  )
}
