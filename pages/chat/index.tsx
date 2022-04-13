import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import {NextPage} from 'next'
import {useQuery} from 'react-query'
import axios from 'axios'
import type {MessageModelDto} from '../../models/messageModel'
import MessageWrapper from '../../components/Message/MessageWrapper'
import Router, {useRouter} from 'next/router'
import {UserModel} from '../../models/userModel'
import {ErrorBoundary} from 'react-error-boundary'
import LoadingError from '../../components/UI/LoadingError'
import AuthContext from '../../context/auth-context'
import provideConfig from '../../utils/axios-config'
import Image from 'next/image'
import UsersWrapper from '../../components/Message/UsersWrapper'
import Chatbox from '../../components/Message/Chatbox'

// export async function getStaticPaths(context) {
//   const userId = context.params?.userId
// }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const userId = context.params?.userId as UserModel['_id']
//   const initialMessages = await getMessages(userId)
//   return {
//     props: {
//       initialMessages,
//     },
//   }
// }

const findRecipientMessages = async (
  recipientId: UserModel['_id'] | null,
): Promise<MessageModelDto[]> => {
  const response = await axios.get<MessageModelDto[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/messages/own/${recipientId}`,
    provideConfig(),
  )
  return response.data
}

const Libraries: NextPage = () => {
  const auth = useContext(AuthContext)
  const [selectedRecipient, setSelectedRecipient] = useState<UserModel>()

  useEffect(() => {
    if (auth && auth.isAuthenticated === false) {
      // Router.push('/')
      // alert('youre not auth')
    }
  }, [auth])

  const {data: messages, refetch} = useQuery(
    'getMessages',
    () => {
      if (selectedRecipient?._id) {
        return findRecipientMessages(selectedRecipient._id)
      }
    },
    {
      retry: false,
      enabled: false,
      suspense: true,
    },
  )
  const refetchMessage = useCallback(() => {
    refetch()
  }, [refetch])

  const router = useRouter()

  useEffect(() => {
    refetchMessage()
  }, [selectedRecipient, refetchMessage])

  return (
    <>
      {auth.user && auth.isAuthenticated && (
        <>
          <main className="flex min-h-full flex-1 flex-row overflow-auto bg-background text-lg">
            <div className="flex min-h-full w-full flex-1 flex-row ">
              <div className="flex  max-w-xs flex-col items-start justify-start overflow-y-auto text-paragraph">
                <Suspense fallback={<LoadingSpinner />}>
                  <UsersWrapper
                    selectedRecipient={selectedRecipient}
                    setSelectedRecipient={setSelectedRecipient}
                  />
                </Suspense>
              </div>
              <div className="relative flex w-full flex-col-reverse overflow-hidden overflow-y-auto bg-buttonText">
                <Suspense fallback={<LoadingSpinner />}>
                  {selectedRecipient && messages && (
                    <MessageWrapper
                      recipientId={selectedRecipient._id}
                      messages={messages}
                    />
                  )}
                </Suspense>

                {selectedRecipient && selectedRecipient._id && (
                  <Suspense fallback={<LoadingSpinner />}>
                    <Chatbox
                      refetchMessage={refetchMessage}
                      recipientId={selectedRecipient._id}
                    />
                  </Suspense>
                )}
              </div>
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default Libraries
