import React from 'react'
import { FaAngleLeft } from "react-icons/fa";
const Header = () => {
  return (
    <>
    <header>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-12 fullpad'>
                    <div className='headerStyle py-4'>
                        <FaAngleLeft className='leftIcon text-white'/>
                        <h5 className='m-0 text-white'>View Audience</h5>
                    </div>
                </div>
            </div>
        </div>
    </header>
    </>
  )
}

export default Header