import React, { FormEvent, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useAppDispatch } from '../../hooks';
import SuggestedItem from './SuggestedItem';

const DiscogInput: React.FC<{
  searchDelay: number;
  searchLength: number;
  getResultFn: any;
  additionalQuery: any | null;
  setResultDetail: any;
  placeholder: string;
  inputValue: string;
}> = (props) => {
  const {
    searchDelay,
    searchLength,
    getResultFn,
    additionalQuery,
    setResultDetail,
    inputValue,
    placeholder,
  } = props;
  const [resultList, setResultList] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lockInput, setLockInput] = useState(false);

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
  }, [searchQuery, dispatch]);

  const onChange = (e: FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement;
    setSearchQuery(event.value);
  };

  const lockInputHandler = (): void => {
    setLockInput(true);
    setResultList(null);
  };

  const unlockInput = (): void => {
    setLockInput(false);
    setSearchQuery('');
  };

  return (
    <>
      <div>
        <input
          id="artist-name"
          className="border-2 p-1 rounded-lg border-black text-center"
          placeholder={placeholder}
          type="text"
          minLength={3}
          required
          onChange={onChange}
          value={lockInput ? inputValue : searchQuery}
          disabled={lockInput}
        />
        {lockInput && (
          <button
            type="button"
            onClick={unlockInput}
            className="cursor-pointer flex flex-row p-2 m-2"
          >
            <ImCross className="cursor-pointer" />
            Modifier
          </button>
        )}
      </div>

      {resultList &&
        resultList.length > 0 &&
        resultList.map((result: any) => (
          <SuggestedItem
            lockInput={lockInputHandler}
            key={result.id}
            result={result}
            setResultDetail={setResultDetail}
          />
        ))}
      {resultList && resultList.length === 0 && (
        <p className="text-center">Aucun résultat trouvé</p>
      )}
    </>
  );
};

export default DiscogInput;
