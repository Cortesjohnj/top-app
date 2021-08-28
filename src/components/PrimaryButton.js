import React from 'react'
import '../assets/styles/PrimaryButton.css'

function PrimaryButton({ children }) {
  return (
    <button type='submit' className='primaryButton'>
      {children}
    </button>
  )
}

export { PrimaryButton }
