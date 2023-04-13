import React, { useEffect, useState } from 'react';

export default function useBoundingClientRect() {
  const ref = React.createRef<HTMLDivElement>();
  const [domRect, setDomRect] = useState<DOMRect>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    toJSON: () => {},
  });
  useEffect(() => {
    const e = ref.current as HTMLDivElement;
    setDomRect(e.getBoundingClientRect());
  }, []);
  return { ref, domRect };
}
