import React, {Suspense, useContext, useEffect} from 'react'
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

const getOwnedMessages = async (
  receiverId: UserModel['_id'],
): Promise<MessageModelDto[]> => {
  const response = await axios.get<MessageModelDto[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/messages/own`,
    provideConfig(),
  )
  return response.data
}

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

const Libraries: NextPage = () => {
  const auth = useContext(AuthContext)

  useEffect(() => {
    if (auth && auth.isAuthenticated === false) {
      // Router.push('/')
      // alert('youre not auth')
    }
  }, [auth])

  const router = useRouter()
  const receiverId = router.query.userId as UserModel['_id']

  const {data: listMessages, refetch} = useQuery(
    'getMessages',
    () => {
      return getOwnedMessages(receiverId)
    },
    {
      retry: false,
      enabled: false,
    },
  )

  return (
    <>
      {auth.user && auth.isAuthenticated && receiverId && (
        <main className="h-full bg-slate-400 pt-8 pb-16 text-lg text-black  md:pt-16">
          <div className="mx-auto flex max-w-full flex-col px-8 md:max-w-5xl">
            <Suspense fallback={<LoadingSpinner />}>
              <MessageWrapper
                sender={auth.user}
                receiverId={receiverId}
                getMessages={getOwnedMessages}
              />
            </Suspense>
          </div>
        </main>
      )}
      <div className="flex-1 bg-slate-200"></div>
    </>
  )
}

export default Libraries
