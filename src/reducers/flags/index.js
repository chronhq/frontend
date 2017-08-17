import { createFlagsReducer } from 'flag';
import defaultFlags from './defaultFlags';
import envFlags from './envFlags';

export default createFlagsReducer({ ...defaultFlags, ...envFlags });