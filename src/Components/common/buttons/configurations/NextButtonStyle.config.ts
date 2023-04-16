const NextButtonStyleConfig = {
  transition: { duration: 0.1 },
  default: {
    container: {
      height: 48,
      padding: '0 80px',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      borderRadius: 8,
      background: 'var(--iris)',
      width: 'fit-content',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    },
    text: {
      color: 'var(--light)',
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: '0.04em',
    },
  },
  active: {
    container: {
      background: 'var(--iris)',
      boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
    },
    text: {
      color: 'var(--light)',
    },
  },
  hover: {
    container: {
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    },
    text: {},
  },
};

export default NextButtonStyleConfig;
