import React from 'react'
import {RiErrorWarningLine} from 'react-icons/ri'
const LoadingError = () => {
  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex max-w-fit flex-row items-center justify-center gap-2 rounded-full border-2 border-current bg-background py-2 px-4 font-semibold text-red-400">
        <RiErrorWarningLine size={36} className="fill-current" />
        <p className="text-2xl">Une erreur est survenue.</p>
      </div>
    </div>
  )
}

export default LoadingError
