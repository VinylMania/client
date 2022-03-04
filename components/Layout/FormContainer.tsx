import React from 'react'
import Link from 'next/link'

const FormContainer: React.FC<{
  title: string
  textLink: string
  textLinkBold: string
}> = ({title, textLink, textLinkBold, children}) => (
  <div className="text-second flex max-h-fit w-full flex-col items-center justify-center space-y-8 overflow-auto  px-16 pb-8 text-headline">
    <h2 className="text-center text-3xl font-extrabold drop-shadow-lg">
      {title}
    </h2>
    <p className="navlink font-thin transition-all duration-300 hover:text-button focus:text-button">
      {textLink} <strong className="font-bold">{textLinkBold}</strong>
    </p>
    {children}
  </div>
)

export default FormContainer
