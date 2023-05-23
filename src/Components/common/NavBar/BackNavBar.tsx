import AssetIndex from '@src/assets/AssetIndex';
import React from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { useAuthGuardContext } from '@src/auth/AuthGuard/AuthGuard';

function BackNavBar(p: { title: string }) {
  const navigate = useNavigate();
  return (
    <NavBar
      leftCom={
        <>
          <div className="vc">
            <div className="mr-3 cursor-pointer" onClick={() => navigate(-1)}>
              <AssetIndex.ArrowLeftIcon />
            </div>
            <p className="subtitle fcolor-text-body">{p.title}</p>
          </div>
        </>
      }
    />
  );
}

export default BackNavBar;
