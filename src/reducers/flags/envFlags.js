const production = {
  // production flags
  flagSet: 'production',
};

const development = {
  // development flags
  flagSet: 'development',
  devTools: true,
  UI: { 
    TimePanel: false,
  }
};

export default (process.env.NODE_ENV === 'production') ? production : development;
