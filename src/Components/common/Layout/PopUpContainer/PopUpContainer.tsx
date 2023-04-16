import React from 'react';
import style from './PopUpContainer.module.css';

function PopUpContainer(props: { children: React.ReactNode; zIndex?: number }) {
  return (
    <div className={style.container} style={{ zIndex: props.zIndex }}>
      {props.children}
    </div>
  );
}

export default PopUpContainer;
