import React, {Suspense} from 'react'
import Message from './index'
import {MessageModelDto} from '../../models/messageModel'
import LoadingSpinner from '../UI/LoadingSpinner'
import {ErrorBoundary} from 'react-error-boundary'
import LoadingError from '../UI/LoadingError'
import {UserModel} from '../../models/userModel'
const MessageWrapper: React.FC<{
  messages: MessageModelDto[]

  recipientId: UserModel['_id']
}> = ({messages, recipientId}) => {
  return (
    <ErrorBoundary fallback={<LoadingError />}>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="flex-1 px-8">
          <>
            {messages &&
              messages.map((message: MessageModelDto) => {
                return (
                  <>
                    {message && message.sender && message.sender._id && (
                      <Message
                        key={message._id}
                        message={message}
                        direction={
                          message.sender._id !== recipientId ? 'right' : 'left'
                        }
                      />
                    )}
                  </>
                )
              })}
          </>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default MessageWrapper
