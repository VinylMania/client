/* eslint-disable react/require-default-props */
import React, { FormEvent, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useAppDispatch } from '../../hooks';
import { DiscogAlbumModel, DiscogArtistModel } from '../../models/discogModel';
import SuggestedItem from './SuggestedItem';

const DiscogInput: React.FC<{
  reset?: () => void;
  searchDelay: number;
  searchLength: number;
  getResultFn: any;
  additionalQuery: string | null;
  inputId: string;
  setResultDetail:
    | React.Dispatch<React.SetStateAction<DiscogArtistModel | undefined>>
    | React.Dispatch<React.SetStateAction<DiscogAlbumModel | undefined>>;
  placeholder: string;
  inputValue: string;
}> = (props) => {
  const {
    reset,
    searchDelay,
    searchLength,
    getResultFn,
    additionalQuery,
    setResultDetail,
    inputValue,
    placeholder,
    inputId,
  } = props;
  const [resultList, setResultList] = useState<
    DiscogAlbumModel[] | DiscogArtistModel[] | undefined
  >();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lockInput, setLockInput] = useState(false);
  const [isHover, setHoverState] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const identifier = setTimeout(() => {
      if (searchQuery.trim().length > searchLength) {
        if (additionalQuery !== null) {
          dispatch(getResultFn(searchQuery, additionalQuery, setResultList));
        } else {
          dispatch(getResultFn(searchQuery, setResultList));
        }
      }
    }, searchDelay);

    return () => {
      clearTimeout(identifier);
    };
  }, [
    additionalQuery,
    getResultFn,
    searchDelay,
    searchLength,
    searchQuery,
    dispatch,
  ]);

  const onChange = (e: FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement;
    setSearchQuery(event.value);
  };

  const lockInputHandler = (): void => {
    setLockInput(true);
    setResultList(undefined);
  };

  const unlockInput = (): void => {
    setLockInput(false);
    setSearchQuery('');
    if (reset) {
      reset();
    }
  };

  return (
    <>
      <label className="font-semibold text-xl" htmlFor={inputId}>
        {placeholder}
      </label>
      <input
        id={inputId}
        className="mt-4 p-2"
        type="text"
        minLength={3}
        required
        onChange={onChange}
        value={lockInput ? inputValue : searchQuery}
        disabled={lockInput}
        autoComplete="off"
      />
      {lockInput && (
        <button
          onMouseEnter={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
          type="button"
          onClick={unlockInput}
          className="text-lg my-4 cursor-pointer flex flex-row items-center hover:text-third"
        >
          <ImCross
            className={`mr-2 transform transition-all duration-200 ${
              isHover ? 'rotate-90' : ''
            }`}
          />
          Modifier
        </button>
      )}

      {resultList &&
        resultList.length > 0 &&
        resultList.map((result: DiscogAlbumModel | DiscogArtistModel) => (
          <SuggestedItem
            lockInput={lockInputHandler}
            key={result.id}
            result={result}
            setResultDetail={setResultDetail}
          />
        ))}
      {resultList && resultList.length === 0 && (
        <p className="my-4 text-center text-first bg-third">
          Aucun résultat trouvé
        </p>
      )}
    </>
  );
};

export default DiscogInput;
