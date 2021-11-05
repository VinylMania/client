/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { useState, useRef } from 'react';

const SuggestedItem: React.FC<{
  result: any;
  setResultDetail: any;
  lockInput: any;
}> = (props) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { result, setResultDetail, lockInput } = props;
  const hoverPosition = useRef<HTMLSpanElement>(null);
  const onClick = (resultId: number): void => {
    setResultDetail(result);
    lockInput();
  };

  const onHover = (): void => {
    setIsHover(true);
  };

  const stopHover = (): void => {
    setIsHover(false);
  };

  return (
    <>
      {result && (
        <div className="cursor-pointer border-black border-b-2 overflow-hidden">
          <p
            // onMouseEnter={onHover}
            // onMouseLeave={stopHover}
            onClick={() => onClick(result)}
            className="text-cyan-700"
          >
            {result.title}
            {/* <span className={isHover ? 'absolute' : 'hidden'}>
              <img
                className="w-14 h-auto "
                src={result.thumb}
                alt={result.title}
              />
            </span> */}
          </p>
        </div>
      )}
    </>
  );
};
export default SuggestedItem;
