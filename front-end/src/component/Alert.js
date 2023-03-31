import React from 'react'

function Alert(props) {
  const danger=(word)=>{
    if(word=="danger")
    {
      word='error'
    }
    return word.toUpperCase()
  }
  return (
    <div style={{height:"50px"}}>
            {props.alert &&  <div className={`alert alert-${props.alert.type}`} role="alert">
                    <strong>{danger(props.alert.type)} </strong>: {props.alert.msg}
                    </div>}
    </div>
     
  )
}

export default Alert