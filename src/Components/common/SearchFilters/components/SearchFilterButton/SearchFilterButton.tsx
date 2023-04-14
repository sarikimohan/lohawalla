import React from 'react';
import Controller from './cs/Controller';
import { InteractionEnum } from '@src/modules/hooks/useInteraction/types';
import DefaultButton from '@src/Components/common/buttons/DefaultButton/DefaultButton';

interface SearchFilterButtonProps {
  onClick: (id: string) => void;
  data: { name: string; isActive: boolean; id: string };
}

export default function SearchFilterButton(props: SearchFilterButtonProps) {
  const { data } = props;
  const styles = {
    transition: { duration: 0.3 },
    hover: {
      container: {
        backgroundColor: 'var(--text-body)',
      },
      text: {
        color: 'var(--light)',
      },
    },
    default: {
      container: {
        padding: '16px 24px',
        width: '172px',
        backgroundColor: 'var(--light)',
        borderRadius: 6,
      },
      text: {
        color: '#5c5c77',
        fontSize: 14,
        fontWeight: 500,
      },
    },
    active: {
      container: {
        backgroundColor: 'var(--fuschia)',
      },
      text: {
        color: 'var(--light)',
      },
    },
  };

  return (
    <DefaultButton
      onClick={() => props.onClick(data.id)}
      label={data.name}
      styles={styles}
      Controller={(a, s) => {
        if (data.isActive) return InteractionEnum.ACTIVE;
        else return  InteractionEnum.DEFAULT
      }}
      initialValue={data.isActive ? InteractionEnum.ACTIVE : InteractionEnum.DEFAULT}
      removeWindowBlur
    />
  );
}
