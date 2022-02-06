import React from 'react'
import {RiErrorWarningLine} from 'react-icons/ri'
const LoadingError = () => {
  return (
    <div className="p-4 w-full flex justify-center">
      <div className="py-2 px-4 bg-background border-2 border-current rounded-full max-w-fit text-red-400 gap-2 font-semibold flex flex-row justify-center items-center">
        <RiErrorWarningLine size={36} className="fill-current" />
        <p className="text-2xl">Une erreur est survenue.</p>
      </div>
    </div>
  )
}

export default LoadingError
