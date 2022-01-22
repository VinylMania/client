import Link from 'next/link'
import React from 'react'

const HomeButton: React.FC = () => {
  return (
    <Link href="/library">
      <a className="flex justify-center content-center absolute  bg-black top-0 left-0 right-0 bottom-0 bg-opacity-10 hover:bg-opacity-70 transition-all duration-300 group">
        <span className="m-auto bg-buttonText group-hover:bg-button text-button group-hover:text-buttonText border-button group-hover:border-buttonText font-semibold text-3xl drop-shadow-2xl p-4 rounded-full  bg-opacity-50 border-2 transition-all duration-300">
          Consulter la bibliothèque
        </span>
      </a>
    </Link>
  )
}

export default HomeButton

// .home-library {
//     @apply absolute top-0 left-0 w-full h-full flex bg-opacity-0 hover:bg-opacity-70 transition-all duration-300;
//   }

//   .home-library p {
//     @apply p-2 cursor-pointer border-white text-white transition-all duration-500;
//   }
//   .home-library:hover p {
//     @apply bg-third transition-all duration-500 text-buttonText;
//   }

//   .home-library:hover > span {
//     @apply border-2 border-third  transition-all duration-300;
//   }
