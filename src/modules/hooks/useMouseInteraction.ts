import { useEffect, useRef } from 'react';
import useInteraction from './useInteraction/useInteraction';
import { InteractionEnum } from './useInteraction/types';

export default function useMouseInteraction(iref?: React.RefObject<HTMLDivElement>) {
  const [state, setState] = useInteraction();
  const ref = iref ? iref : useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (state !== InteractionEnum.ACTIVE) setState(InteractionEnum.HOVER);
  };

  const handleMouseLeave = () => {
    if (state !== InteractionEnum.ACTIVE) setState(InteractionEnum.DEFAULT);
  };

  const handleClick = () => {
    if (state !== InteractionEnum.ACTIVE) setState(InteractionEnum.ACTIVE);
  };

  useEffect(() => {
    const e = ref.current as HTMLDivElement;
    if (e === null) return () => {};
    e.addEventListener('mouseenter', handleMouseEnter);
    e.addEventListener('mouseleave', handleMouseLeave);
    e.addEventListener('click', handleClick);
    return () => {
      e.removeEventListener('mouseenter', handleMouseEnter);
      e.removeEventListener('mouseleave', handleMouseLeave);
      e.removeEventListener('click', handleClick);
    };
  }, []);

  return { ref, state, setState };
}
