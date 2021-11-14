import React, { useRef, useState } from 'react';

import { useAppDispatch } from '../../../hooks';
import { updateProfile } from '../../../actions/profile';

const UploadAvatar: React.FC<{ setUserDetail: any }> = ({ setUserDetail }) => {
  const dispatch = useAppDispatch();
  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<any>();

  const postMedia = (e: React.FormEvent): void => {
    e.preventDefault();

    dispatch(updateProfile(avatarRef, setUserDetail));
  };

  const uploadAvatar = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;

    if (files) {
      setAvatar(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="flex flex-col border-4 border-third">
      <form>
        <input
          ref={avatarRef}
          type="file"
          name="file"
          accept="image/png image/jpg"
          onChange={uploadAvatar}
        />
        <button type="submit" onClick={(e) => postMedia(e)}>
          Envoyer
        </button>
        {avatar && <img className="w-36" src={avatar} alt="Avatar" />}
      </form>
    </div>
  );
};

export default UploadAvatar;
