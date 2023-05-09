import AssetIndex from '@src/assets/AssetIndex';
import React from 'react';
import style from './BackButton.module.css';

function BackButton() {
  return (
    <div className="cursor-pointer">
      <AssetIndex.BackArrowIcon />
    </div>
  );
}

export default BackButton;
