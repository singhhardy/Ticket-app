import React from 'react'
import {FaArrowCircleLeft} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function BackButton({url}) {
  return (
    <div>
        <Link to={url} className='btn btn-reverse btn-back' ><FaArrowCircleLeft /></Link>
    </div>
  )
}
    
export default BackButton