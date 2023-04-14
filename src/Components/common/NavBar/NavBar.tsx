import React from 'react';
import Clock from '../Clock/Clock';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import style from './NavBar.module.css';

interface NavBarProps {
  leftCom: React.ReactNode;
}

function NavBar(p: NavBarProps) {
  return (
    <div className={style.box}>
      <div className={style.container + ' vc'}>
        {/* <p className="subtitle fcolor-text-body fw-medium">Category</p> */}
        {p.leftCom}
        <div className={style.rightContents}>
          <div className={style.clockWrapper}>
            <Clock />
          </div>
          <div className={style.divider}></div>
          <div className={style.profileWrapper}>
            <ProfileIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
