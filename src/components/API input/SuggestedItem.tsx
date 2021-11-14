/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React from 'react';
import { DiscogArtistModel, DiscogAlbumModel } from '../../models/discogModel';

const SuggestedItem: React.FC<{
  result: DiscogAlbumModel | DiscogArtistModel | undefined;
  setResultDetail: any;
  lockInput: () => void;
}> = (props) => {
  const { result, setResultDetail, lockInput } = props;
  const setResultHandler = (): void => {
    setResultDetail(result);
    lockInput();
  };

  return (
    <>
      {result && (
        <button
          className="cursor-pointer text-left bg-first hover:bg-third text-second hover:text-first transition-all duration-200 overflow-hidden"
          type="button"
          onClick={setResultHandler}
        >
          {result.title}
        </button>
      )}
    </>
  );
};
export default SuggestedItem;
