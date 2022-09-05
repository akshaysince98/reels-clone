import React from 'react'

function Videos(props) {
  return (
    <div>
      <video src={props.src} className="videos"></video>
    </div>
  )
}

export default Videos
