import React from 'react'
import { FaAngleLeft } from "react-icons/fa";
import AddSchema from './AddSchema';


const SideSegment = () => {
  return (
    <>
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-md-12 fullpad'>
                <button className="segmentBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    Save Segment
                </button>
                <div className="offcanvas offcanvas-end " tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header offCanvasBg">
                        <FaAngleLeft className='leftIcon text-white' data-bs-dismiss="offcanvas" aria-label="Close"  style={{cursor:"pointer"}}/>
                        <h5 className="offcanvas-title ms-3 text-white" id="offcanvasRightLabel">Saving Segment</h5>
                    </div>
                    <div className="offcanvas-body">
                        <div className="row">
                            <div className="col-md-12 fullpad">
                                <AddSchema />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default SideSegment

