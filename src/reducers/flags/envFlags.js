const envFlags = (process.env.NODE_ENV === 'production')
  ? {
    // production flags
    flagSet: 'production',
  }
  : {
    // development flags
    flagSet: 'development',
    devTools: true,
  };

export default envFlags;