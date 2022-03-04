import Link from 'next/link'
import React from 'react'
import {Disc} from 'react-feather'

const Footer: React.FC = () => (
  <footer className="mt-auto flex flex-row justify-center bg-button p-8 text-background">
    <div className="flex w-full max-w-full flex-col  items-baseline justify-center gap-8 md:max-w-4xl md:flex-row md:items-center">
      <p className="mr-auto flex flex-row items-center justify-center gap-4 text-lg font-semibold">
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
