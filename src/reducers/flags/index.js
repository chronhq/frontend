import { createFlagsReducer } from 'flag';
import defaultFlags from './defaultFlags';
import envFlags from './envFlags';

const isObject = item => (item && typeof item === 'object' && !Array.isArray(item));

function mergeFlags(source, target) {
  const flags = { ...source, ...target };
  const deep = Object.keys(flags).reduce((prev, flag) => (
    (isObject(flags[flag] && source[flag] && target[flag]))
      ? { ...prev, [flag]: mergeFlags(source[flag], target[flag]) }
      : prev), {});
  return { ...flags, ...deep };
}

const flags = mergeFlags(defaultFlags, envFlags);

export default createFlagsReducer(flags);
