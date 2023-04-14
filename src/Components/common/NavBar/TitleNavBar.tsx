import React from 'react';
import NavBar from './NavBar';

function TitleNavBar(p: { title: string }) {
  return <NavBar leftCom={<p className="subtitle fcolor-text-body fw-medium">{p.title}</p>} />;
}

export default TitleNavBar;
