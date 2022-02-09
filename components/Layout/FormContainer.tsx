import React from 'react'
import Link from 'next/link'

const FormContainer: React.FC<{
  title: string
  textLink: string
  textLinkBold: string
}> = ({title, textLink, textLinkBold, children}) => (
  <div className="flex max-h-fit w-full flex-col items-center  justify-center space-y-8 overflow-auto px-16  pb-8 text-second">
    <h2 className="text-center text-3xl font-extrabold text-headline drop-shadow-lg">
      {title}
    </h2>
    <p className="navlink font-thin text-paragraph transition-all duration-300 hover:text-button focus:text-button">
      {textLink} <strong className="font-bold">{textLinkBold}</strong>
    </p>
    {children}
  </div>
)

export default FormContainer
