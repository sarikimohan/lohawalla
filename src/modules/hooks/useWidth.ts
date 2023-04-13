import React, { useEffect, useState } from 'react';
import LayoutService from '../Layout/Layout';

export default function useWidth(config?: GetWidthConfig) {
  const ref = React.createRef<HTMLDivElement>();
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(LayoutService.getWidth(ref, config));
  }, []);

  return { ref, width };
}
