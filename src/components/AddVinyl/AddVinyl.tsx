import React, {FormEvent} from 'react'
import {Navigate} from 'react-router'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {updateLibrary} from '../../actions/library'
import ArtistInput from '../API input/ArtistInput'
import AlbumInput from '../API input/AlbumInput'

const AddVinyl: React.FC = () => {
  const dispatch = useAppDispatch()

  // Redirect if user authenticated
  const isAuth = useAppSelector(state => state.root.authReducer.isAuthenticated)

  const discogsReducer = useAppSelector(state => state.root.discogsReducer)

  if (!isAuth) {
    return <Navigate to="/home" />
  }

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault()
    dispatch(updateLibrary())
  }

  return (
    <section className="vinyl-form-parent">
      <form className="vinyl-form" onSubmit={e => onSubmit(e)}>
        <ArtistInput />
        <AlbumInput />

        <button
          className={`mt-2 ${
            discogsReducer.canSubmit ? 'btn-submit' : 'btn-disabled'
          }`}
          type="submit"
          disabled={!discogsReducer.canSubmit}
        >
          Ajouter le vinyle
        </button>
      </form>
    </section>
  )
}

export default AddVinyl
