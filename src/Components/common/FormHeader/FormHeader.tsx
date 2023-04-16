import AssetIndex from '@src/assets/AssetIndex';
import { motion } from 'framer-motion';
import React from 'react';
import BackButton from './components/BackButton';
import style from './FormHeader.module.css';

interface FormHeader {
  navBack: () => void;
  close: () => void;
  heading: string;
  preHeading: string;
}

function FormHeader(p: FormHeader) {
  return (
    <div className={style.headerRow + ' vc'}>
      <div className={style.backButtonBox} onClick={p.navBack}>
        <BackButton />
      </div>
      <div className={style.headingBox}>
        <p className="body fcolor-text-subtitle">{p.preHeading}</p>
        <p className="h2 fcolor-fuschia fw-bold">{p.heading}</p>
      </div>
      <div className={' cursor-pointer'}>
        <motion.div whileHover={{ rotateZ: 360, scale: 1.1 }} onClick={p.close}>
          <AssetIndex.CloseIcon />
        </motion.div>
      </div>
    </div>
  );
}

export default FormHeader;
