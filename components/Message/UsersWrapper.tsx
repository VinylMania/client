import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import {useQuery} from 'react-query'
import {UserModel} from '../../models/userModel'
import provideConfig from '../../utils/axios-config'
const getRecipients = async (): Promise<UserModel[]> => {
  const response = await axios.get<UserModel[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/messages/own`,
    provideConfig(),
  )
  return response.data
}

const UsersWrapper: React.FC<{
  setSelectedRecipient: React.Dispatch<
    React.SetStateAction<UserModel | undefined>
  >
  selectedRecipient: UserModel | undefined
}> = ({setSelectedRecipient, selectedRecipient}) => {
  const {data: recipients} = useQuery(
    'getRecipients',
    () => {
      return getRecipients()
    },
    {
      // retry: false,
      suspense: true,
    },
  )

  return (
    <>
      {recipients &&
        recipients.map(recipient => (
          <div
            key={recipient._id}
            className={`w-full select-none p-2 px-8 ${
              selectedRecipient?._id === recipient._id
                ? 'bg-white/25 text-button'
                : 'hover:cursor-pointer'
            } `}
            onClick={() => {
              setSelectedRecipient(recipient)
            }}
          >
            <figure className="flex flex-row items-start justify-start gap-2">
              <div className="relative h-[40px] min-h-[40px] w-[40px] min-w-[40px] overflow-hidden rounded-full">
                {recipient.avatar && (
                  <Image
                    src={recipient.avatar}
                    alt={`avatar de ${recipient?.username}`}
                    layout="fill"
                    objectFit="cover"
                    quality={30}
                    priority
                    placeholder="empty"
                  />
                )}
              </div>

              <p className="text-lg font-semibold">{recipient.username}</p>
            </figure>
          </div>
        ))}
    </>
  )
}

export default UsersWrapper
