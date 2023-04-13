import { motion } from 'framer-motion';
import React from 'react';
import style from './SidebarButton.module.css';
import InteractionObserver from '../../InteractionObserver/InteractionObserver';
import useInteraction from '@src/modules/hooks/useInteraction/useInteraction';
import { InteractionEnum, MouseInteractions } from '@src/modules/hooks/useInteraction/types';

interface SidebarButtonProps {
  activeIcon: React.ReactNode;
  inActiveIcon: React.ReactNode;
  // activeStyle: { container: Object; text: Object };
  // inactiveStyle: { container: Object; text: Object };
  label: string;
  id: number;
  currentActive: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const styles = {
  transition: { duration: 0.3 },
  active: {
    container: {
      borderLeft: '4px solid black',
    },
    text: {
      color: 'var(--fuschia)',
      fontWeight: 700,
    },
  },
  inactive: {
    container: { borderLeft: '4px solid transparent' },
    text: {
      color: 'var(--text-subtitle)',
    },
  },
  hover: {
    text: {
      color: 'var(--light)',
    },
    container: {
      backgroundColor: 'var(--text-body)',
    },
  },
};

function StateStyleMapper(isActive: boolean, state: InteractionEnum) {
  if (isActive) return styles.active;
  switch (state) {
    case InteractionEnum.ACTIVE:
      return styles.active;
    case InteractionEnum.HOVER:
      return styles.hover;
    default:
      return styles.inactive;
  }
}

function Controller(action: MouseInteractions, prev: InteractionEnum) {
  switch (action) {
    case 'click':
      return InteractionEnum.ACTIVE;
    case 'mouse-enter':
      return InteractionEnum.HOVER;
    default:
      return InteractionEnum.DEFAULT;
  }
}

function SidebarButton(p: SidebarButtonProps) {
  const [interaction, setInteraction] = useInteraction();
  const isActive = p.id === p.currentActive;
  const { container, text } = StateStyleMapper(isActive, interaction);

  return (
    <motion.div
      className={style.container}
      animate={container}
      onClick={(e) => {
        p.setActive(p.id);
        p.onClick && p.onClick(e);
      }}
      transition={styles.transition}
    >
      <div className={style.iconBox}>
        <motion.div
          style={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={styles.transition}
        >
          {p.activeIcon}
        </motion.div>
        <motion.div
          className={style.iconBox__overlay}
          animate={!isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={styles.transition}
        >
          {p.inActiveIcon}
        </motion.div>
      </div>

      <motion.p animate={text} className="body fcolor-fuschia fw-medium" transition={styles.transition}>
        {p.label}
      </motion.p>
      <InteractionObserver
        interaction={interaction}
        setInteraction={setInteraction}
        removeWindowBlur
        Controller={Controller}
      />
    </motion.div>
  );
}

export default SidebarButton;
