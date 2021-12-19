import React, {FormEvent} from 'react'
import {useAppDispatch, useAppSelector} from '../../../hooks'
import {addVinyle} from '../../../actions/library'
import ArtistInput from '../API input/ArtistInput'
import AlbumInput from '../API input/AlbumInput'

const AddVinyl: React.FC = () => {
  const dispatch = useAppDispatch()
  const discogsReducer = useAppSelector(state => state.root.discogsReducer)

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault()
    dispatch(addVinyle())
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
