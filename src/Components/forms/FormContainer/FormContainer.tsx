import React from 'react';
import style from './FormContainer.module.css';

function FormContainer(p: { children: React.ReactNode; width?: number }) {
  return (
    <div className={style.container} style={{ width: p.width }}>
      {p.children}
    </div>
  );
}

export default FormContainer;
