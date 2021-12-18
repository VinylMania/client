import React from 'react'
import {Link, useMatch, useResolvedPath} from 'react-router-dom'
import type {LinkProps} from 'react-router-dom'

const CustomLink: React.FC<{className: string; to: string}> = ({
  children,
  className,
  to,
}: LinkProps) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({path: resolved.pathname, end: true})

  return (
    <>
      <Link className={`${className} ${match ? 'font-semibold' : ''} `} to={to}>
        {children}
      </Link>
    </>
  )
}

export default CustomLink
