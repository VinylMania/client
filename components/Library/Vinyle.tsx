import React from 'react'
import Moment from 'react-moment'
import {VinyleResponse} from '../../models/albumModel'
import Link from 'next/link'
import Image from 'next/image'
import {Button} from '@mantine/core'
import {BsDiscFill} from 'react-icons/bs'
const Vinyle: React.FC<{
  vinyle: VinyleResponse
}> = ({vinyle}) => {
  const {albumTitle, albumCoverUrl, artistTitle, year, _id} = vinyle
  return (
    <figure className=" relative mx-auto h-[300px] w-[200px] overflow-hidden">
      <div>
        <Image
          alt={albumTitle}
          layout="fill"
          objectFit="cover"
          width={200}
          height={200}
          blurDataURL={albumCoverUrl}
          src={albumCoverUrl}
          quality={50}
          placeholder="blur"
        />
      </div>

      <div className="absolute top-0 left-0 h-full w-full bg-black/0 hover:bg-black/90">
        <ul className="transition-300 absolute top-0 right-0 bottom-0 left-0 flex flex-col items-start justify-end overflow-hidden p-2 text-white opacity-100 hover:text-button focus:text-button">
          <li className="px-2">{artistTitle}</li>
          <li className="px-2 text-lg font-semibold">
            {albumTitle.split('-')[1] ?? albumTitle}
          </li>
          <li className="px-2 pb-2">{year}</li>

          <li className="flex w-full justify-center">
            <Link href={`/library/${_id}`} passHref>
              <Button
                component="a"
                className="rounded-lg border-2 border-current bg-buttonText p-2 text-paragraph transition-all hover:bg-background "
                leftIcon={<BsDiscFill size={20} />}
              >
                Consulter
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </figure>
  )
}

export default Vinyle
