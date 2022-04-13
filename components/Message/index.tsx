import Image from 'next/image'
import React from 'react'
import {MessageModelDto} from '../../models/messageModel'
import Moment from 'react-moment'
import {Tooltip} from '@mantine/core'

const index: React.FC<{
  direction: 'left' | 'right'
  message: MessageModelDto
}> = ({direction, message}) => {
  const {content, sender, receiver, date_created, date_updated} = message
  return (
    <div className="flex py-4 px-8 font-sans last:pb-32">
      <div
        className={`flex flex-row items-center gap-2 ${
          direction === 'right' ? 'ml-auto' : ''
        }`}
      >
        {direction === 'left' && (
          <figure className="flex flex-col justify-center">
            <button className="relative mx-auto h-[40px] w-[40px] overflow-hidden rounded-full">
              {sender && sender.avatar && (
                <Image
                  src={sender.avatar}
                  alt={`avatar de ${sender.username}`}
                  layout="fill"
                  objectFit="cover"
                  quality={50}
                  priority
                  placeholder="empty"
                />
              )}
            </button>
          </figure>
        )}
        <p className="flex-grow rounded-l-lg rounded-tr-lg bg-button/50 px-6 py-3 text-paragraph">
          {content}
        </p>
        {direction === 'right' && (
          <figure className="flex flex-col justify-center">
            {/* <button className="relative mx-auto h-[40px] w-[40px] overflow-hidden rounded-full">
              {sender && sender.avatar && (
                <Image
                  src={sender.avatar}
                  alt={`avatar de ${sender.username}`}
                  layout="fill"
                  objectFit="cover"
                  quality={25}
                  priority
                  placeholder="empty"
                />
              )}
            </button> */}
          </figure>
        )}
        <Tooltip
          className="h-min self-center rounded-full bg-background px-4 py-2 text-sm text-headline"
          label={
            <Moment
              locale="fr"
              date={date_updated ? date_updated : date_created}
              format="DD/MM/YYYY H:m:s"
            ></Moment>
          }
          withArrow
          position="right"
          placement="end"
          gutter={0}
        >
          <Moment locale="fr" fromNow>
            {date_updated ? date_updated : date_created}
          </Moment>
        </Tooltip>
      </div>
    </div>
  )
}

export default index
