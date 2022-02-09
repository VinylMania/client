import Link from 'next/link'
import React from 'react'

const HomeButton: React.FC = () => {
  return (
    <Link href="/library">
      <a className="group absolute top-0 left-0  right-0 bottom-0 flex content-center justify-center bg-black bg-opacity-10 transition-all duration-300 hover:bg-opacity-70">
        <span className="m-auto rounded-full border-2 border-button bg-buttonText bg-opacity-50 p-4 text-3xl font-semibold text-button drop-shadow-2xl transition-all  duration-300 group-hover:border-buttonText group-hover:bg-button group-hover:text-buttonText">
          Consulter la bibliothèque
        </span>
      </a>
    </Link>
  )
}

export default HomeButton
