import {Button, InputWrapper, TextInput} from '@mantine/core'
import axios from 'axios'
import React, {FormEvent, useRef, useState} from 'react'
import {MessageCircle} from 'react-feather'
import {UserModel} from '../../models/userModel'
import provideConfig from '../../utils/axios-config'

const sendMessage = async (message: {
  content: string
  receiverId: UserModel['_id']
}) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/messages/`,
    JSON.stringify({...message}),
    provideConfig(),
  )
}

const Chatbox: React.FC<{
  recipientId: UserModel['_id']
  refetchMessage: () => void
}> = ({recipientId, refetchMessage}) => {
  const textInputRef = useRef<HTMLInputElement>(null)
  const postMessage = async (e: FormEvent) => {
    e.preventDefault()
    await sendMessage({content: value, receiverId: recipientId})
    refetchMessage()
    setValue('')
    textInputRef.current?.focus()
  }
  const [value, setValue] = useState('')
  return (
    <form
      className="fixed flex w-full max-w-[90%] flex-col bg-buttonText px-8  py-2 drop-shadow-sm"
      onSubmit={e => postMessage(e)}
    >
      <fieldset className="flex items-center gap-8">
        <TextInput
          ref={textInputRef}
          aria-describedby="Envoyer un message"
          value={value}
          className="form-text-inputs flex-1"
          required
          autoFocus
          onChange={event => setValue(event.currentTarget.value)}
        />

        <Button
          color="#fff"
          type="submit"
          className="btn-submit"
          leftIcon={<MessageCircle />}
        >
          <p>Envoyer !</p>
        </Button>
      </fieldset>
    </form>
  )
}

export default Chatbox
