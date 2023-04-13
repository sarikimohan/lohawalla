import React, { useEffect, useState } from 'react';

export default function usePosition<T = HTMLDivElement>() {
  const ref = React.createRef<T>();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const e = ref.current as HTMLElement;
    const x = e.getBoundingClientRect().x;
    const y = e.getBoundingClientRect().y;
    setPosition({ x, y });
  }, []);
  return { position, ref };
}
