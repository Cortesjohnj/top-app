import React from 'react'
import '../assets/styles/PrimaryButton.css'

function PrimaryButton({ name }) {
  return (
    <button type='submit' className='primary__button'>
      {name}
    </button>
  )
}

export { PrimaryButton }
