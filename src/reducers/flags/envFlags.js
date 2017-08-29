const production = {
  // production flags
  flagSet: 'production',
};

const development = {
  // development flags
  flagSet: 'development',
  devTools: true,
  UI: { devProjection: true },
};

export default (process.env.NODE_ENV === 'production') ? production : development;
