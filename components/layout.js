import React from 'react'
import '../styles/index.css'

const Layout = ({children, ...props}) => (
  <div className="flex align-center justify-center lg:h-screen" props>
      <div className="max-w-6xl xl:max-w-7xl mt-4 w-full">
        <h1 className="text-center"><span className="text-4xl font-bold">Quick Deploy</span></h1>
        {children}
      </div>
  </div>
)

export default Layout
