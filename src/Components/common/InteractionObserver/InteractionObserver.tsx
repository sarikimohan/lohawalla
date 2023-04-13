import { InteractionEnum, MouseInteractions } from '@src/modules/hooks/useInteraction/types';
import React, { useEffect, useRef } from 'react';

interface InteractionObserverProps {
  interaction: InteractionEnum;
  setInteraction: React.Dispatch<React.SetStateAction<InteractionEnum>>;
  Controller?: (action: MouseInteractions, prev: InteractionEnum) => InteractionEnum;
  removeWindowBlur?: boolean;
}

function Controller(action: MouseInteractions, prev: InteractionEnum) {
  if (prev === InteractionEnum.ACTIVE) return prev;
  switch (action) {
    case 'mouse-enter':
      return InteractionEnum.HOVER;
    case 'mouse-leave':
      return InteractionEnum.DEFAULT;
    case 'click': {
      return InteractionEnum.ACTIVE;
    }
    default:
      return InteractionEnum.DEFAULT;
  }
}

function InteractionObserver(p: InteractionObserverProps) {
  const c = (action: MouseInteractions) =>
    p.Controller ? p.Controller(action, p.interaction) : Controller(action, p.interaction);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elem = ref.current as HTMLDivElement;
    const removeActiveWhenClicked = (e: MouseEvent) => {
      const bcr = elem.getBoundingClientRect();
      const cps = getComputedStyle(elem);
      const mnX = bcr.x;
      const mxX = bcr.x + parseFloat(cps.width);

      if (e.clientX < mnX || e.clientX > mxX) {
        p.setInteraction(InteractionEnum.DEFAULT);
      }
    };
    if (!p.removeWindowBlur) {
      window.addEventListener('click', removeActiveWhenClicked);
      return () => window.removeEventListener('click', removeActiveWhenClicked);
    }
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => p.setInteraction(c('mouse-enter'))}
      onMouseLeave={() => p.setInteraction(c('mouse-leave'))}
      onClick={() => p.setInteraction(c('click'))}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'hidden',
        top: 0,
        left: 0,
      }}
    ></div>
  );
}

export default InteractionObserver;
