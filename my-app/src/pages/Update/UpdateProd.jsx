import React from 'react'
import Admin_Header from '../Home/components/Admin/Admin_Header'
import { useParams } from 'react-router-dom'
import ProdContents from './components/ProdContents';

const UpdateProd = () => {
  return (
    <div>
          <Admin_Header />
          <ProdContents />
    </div>
  )
}

export default UpdateProd
