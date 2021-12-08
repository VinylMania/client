import React from 'react'
import {Link} from 'react-router-dom'

const FormContainer: React.FC<{
  title: string
  link: string
  textLink: string
  textLinkBold: string
}> = ({title, link, textLink, textLinkBold, children}) => (
  <div className="vinyl-form-parent">
    <h1 className="vinyl-title text-center text-second underline">{title}</h1>
    {children}
    <Link className="text-second hover:underline " to={link}>
      {textLink} <strong>{textLinkBold}</strong>
    </Link>
  </div>
)

export default FormContainer
