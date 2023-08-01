import React from 'react'

const Header = () => {
    const logo_URL="https://play-lh.googleusercontent.com/F8smpUQrmg62pL8fKYymxOt7JOtnpY8uWTu9_-74hFv-JIwOGwjWyNvzKCYfM8VIRHM"
  return (
    <div className='header'>
        <img src={logo_URL} alt="logo" width={50} height={50} />
      <h3>Note Track</h3>
    </div>
  )
}

export default Header
