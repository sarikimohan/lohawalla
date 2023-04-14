import React from 'react';
import DefaultButton from '../DefaultButton/DefaultButton';

const styleConfig = {
  transition: { duration: 0.3 },
  default: {
    container: {
      height: 48,
      padding: '0 16px',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      borderRadius: 8,
      background: '#fff',
      width: 'fit-content',
    },
    text: {
      color: 'var(--iris)',
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    },
  },
  active: {
    container: {
      background: '#dbdbfb',
    },
    text: {},
  },
  hover: {
    container: {
      background: '#dbdbfb',
    },
    text: {},
  },
};

function TextButton(props: { onClick: () => void; label: string }) {
  return <DefaultButton onClick={props.onClick} label={props.label} styles={styleConfig} />;
}

export default TextButton;
