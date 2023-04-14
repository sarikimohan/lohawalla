import AssetIndex from '@src/assets/AssetIndex';
import React, { useEffect, useRef, useState } from 'react';
import SearchFilterButton from './components/SearchFilterButton/SearchFilterButton';
import style from './SearchFilters.module.css';
import useBoundingClientRect from '@src/modules/hooks/useBoundingClientRect';

// in --> [{id, label}] --> out [{id}]
export interface SearchFilterOptions {
  id: string;
  label: string;
  isActive: boolean;
}

interface SearchFiltersProps {
  options: SearchFilterOptions[];
  onItemClick: (id: string) => void;
}

function SearchFilters(p: SearchFiltersProps) {
  const [show, setShow] = useState(false);
  const { ref, domRect } = useBoundingClientRect();

  return (
    <div className="cursor-pointer" style={{ position: 'relative' }}>
      <div onClick={() => setShow((prev) => !prev)} ref={ref}>
        <AssetIndex.FilterIcon />
      </div>
      {show && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0 }}>
          <div className={style.sheet}>
            {p.options.map((val, index) => {
              return <SearchFilterButton onClick={p.onItemClick} data={val} key={index} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchFilters;
