import { useEffect, useState } from 'react';
import useBoundingClientRect from './useBoundingClientRect';

export default function useDropDown(lst: string[]) {
  const { ref, domRect } = useBoundingClientRect();
  const [status, setShowDD] = useState(false);
  const [list, setList] = useState(lst);
  const [selection, setSelection] = useState(0);

  const width = domRect.width;
  const hide = () => setShowDD(false);
  const show = () => setShowDD(true);
  const toggle = () => setShowDD((prev) => !prev);
  const setMeSelected = (n: number) => setSelection(n);
  const isSelected = (n: number) => selection === n;
  const getCurrentSelected = () => (list.length ? list[selection] : '');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return { ref, hide, show, status, toggle, width, setMeSelected, isSelected, list, setList, getCurrentSelected };
}
