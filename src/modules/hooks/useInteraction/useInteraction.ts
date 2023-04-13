import { useState } from 'react';
import { InteractionEnum } from './types';

export default function useInteraction(initialValue: InteractionEnum = InteractionEnum.DEFAULT) {
  return useState<InteractionEnum>(initialValue);
}
