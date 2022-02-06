import Link from 'next/link'
import React from 'react'
import {Disc} from 'react-feather'

const Footer: React.FC = () => (
  <footer className="mt-auto bg-black flex flex-row justify-center p-8">
    <div className="flex flex-col items-baseline md:items-center  md:flex-row gap-8 justify-center w-full max-w-full md:max-w-4xl">
      <p className="flex flex-row justify-center gap-4 items-center mr-auto text-lg font-semibold">
        <Disc size={30} strokeWidth={2} /> <span> VinylMania</span>
      </p>
      <p>
        Développé par
        <strong>
          <Link href="https://varkoff.fr">
            <a> Varkoff</a>
          </Link>
        </strong>{' '}
        © 2022
      </p>
    </div>
  </footer>
)

export default Footer
