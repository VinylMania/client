import React from 'react'
import Link from 'next/link'

const FormContainer: React.FC<{
  title: string
  link: string
  textLink: string
  textLinkBold: string
}> = ({title, link, textLink, textLinkBold, children}) => (
  <div className="py-16 px-4 md:px-0 w-full flex justify-center">
    <div className="bg-buttonText max-w-full md:max-w-md w-full rounded-xl my-4 px-4 py-8 space-y-8 flex flex-col items-center justify-center text-second mt-8 mx-auto">
      <h2 className="text-3xl font-extrabold drop-shadow-lg text-center text-headline">
        {title}
      </h2>
      <Link href={link}>
        <a className="font-medium text-paragraph text-sm hover:text-headline">
          {textLink} <strong>{textLinkBold}</strong>
        </a>
      </Link>{' '}
      {children}
    </div>
  </div>
)

export default FormContainer
