import React from 'react'

export default function ProfileLayout({children}) {
  return (
<>
  <h2>this is profile header</h2>  
  {children}
  <h2>this is profile footer</h2>
</>
  )
}
