import React from 'react';
import style from './BannerContainer.module.css';
export default function BannerContainer(props: { children: React.ReactNode; width?: number }) {
  return <div className={style.bannerContainer}>{props.children}</div>;
}
