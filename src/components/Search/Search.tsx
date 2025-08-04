import React from "react";
import debounce from 'lodash.debounce';
import { useCallback, useRef, useState } from 'react';
import { setSearch } from "../../redux/slices/filterSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";

type SearchProps = {
	open: boolean;
	handleToggle: () => void;
}

const Search: React.FC<SearchProps> = ({ open, handleToggle }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	const handleClickClear = () => {
    setValue('');
    dispatch(setSearch(''));
	if(inputRef.current) {
    	inputRef.current.focus();
	}
  };
  const handleChange = useCallback(
    debounce((str: string) => {
		dispatch(setSearch(str));
    }, 1000),
    [],
  );
  const handleChangeInput = (str: string) => {
    setValue(str);
    handleChange(str);
  };
  return (
    <>
      {open && (
        <div className={'searchArea' + (open ? ' active' : '')} onClick={handleToggle}>
          <div onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              className={'input'}
              value={value}
              type="text"
              placeholder="Поиск растения"
              onChange={(e) => handleChangeInput(e.target.value)}
            />
            <svg
              onClick={handleClickClear}
              className={'cross'}
              enableBackground="new 0 0 32 32"
              height="32px"
              id="Слой_1"
              version="1.1"
              viewBox="0 0 32 32"
              width="32px"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"
                fill="#121313"
                id="Close"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
