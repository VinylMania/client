import React from 'react'
import Link from 'next/link'

const FormContainer: React.FC<{
  title: string
  link: string
  textLink: string
  textLinkBold: string
}> = ({title, link, textLink, textLinkBold, children}) => (
  <div className="vinyl-form-parent">
    <h1 className="vinyl-title text-center text-second underline">{title}</h1>
    {children}
    <Link href={link}>
      <a className="text-second hover:underline">
        {textLink} <strong>{textLinkBold}</strong>
      </a>
    </Link>
  </div>
)

export default FormContainer
