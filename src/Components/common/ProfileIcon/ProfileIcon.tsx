import React from 'react';
import style from './ProfileIcon.module.css';
import Avatar from '../Avatar/Avatar';

function ProfileIcon() {
  return (
    <div className={style.avatarContainer + ' vc'}>
      <p className={style.nameText + ' fcolor-text-body body fw-medium'}>Samantha</p>
      <div className={style.profileIconWrapper}>
        <Avatar src={''} radius={36} />
      </div>
    </div>
  );
}

export default ProfileIcon;
