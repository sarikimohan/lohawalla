
import { InteractionEnum, MouseInteractions } from '@src/modules/hooks/useInteraction/types';

export default function Controller(actions: MouseInteractions, state: InteractionEnum) {
  if (actions === 'click') {
    if (state === InteractionEnum.ACTIVE) return InteractionEnum.DEFAULT;
    else return InteractionEnum.ACTIVE;
  }

  if (state === InteractionEnum.ACTIVE) return InteractionEnum.ACTIVE;

  switch (actions) {
    case 'mouse-enter':
      return InteractionEnum.HOVER;
    case 'mouse-leave':
      return InteractionEnum.DEFAULT;
  }
} 
