const production = {
  // production flags
  flagSet: 'production',
};

const development = {
  // development flags
  flagSet: 'development',
  devTools: true,
};

export default (process.env.NODE_ENV === 'production') ? production : development;
