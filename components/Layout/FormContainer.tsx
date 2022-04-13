import React from 'react'
import Link from 'next/link'

const FormContainer: React.FC<{
  title: string
}> = ({title, children}) => (
  <div className="text-second flex max-h-fit w-full flex-col items-center justify-center space-y-8 overflow-auto  px-16 pb-8 text-headline">
    <h2 className="text-center text-3xl font-extrabold drop-shadow-lg">
      {title}
    </h2>

    {children}
  </div>
)

export default FormContainer
