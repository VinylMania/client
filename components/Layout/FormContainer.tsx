import React from 'react'
import Link from 'next/link'

const FormContainer: React.FC<{
  title: string
  textLink: string
  textLinkBold: string
}> = ({title, textLink, textLinkBold, children}) => (
  <div className="flex flex-col items-center justify-center w-full  px-16 pb-8 space-y-8 text-second  max-h-fit overflow-auto">
    <h2 className="text-3xl font-extrabold drop-shadow-lg text-center text-headline">
      {title}
    </h2>
    <p className="navlink font-thin text-paragraph transition-all duration-300 hover:text-button focus:text-button">
      {textLink} <strong className="font-bold">{textLinkBold}</strong>
    </p>
    {children}
  </div>
)

export default FormContainer
