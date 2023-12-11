import { exercise } from './documents/exercise';
import { equipment } from './documents/equipment';
import { target } from './documents/target';
import { content } from './content';
import { program } from './documents/program';
import { workout } from './documents/workout';
import { exerciseWithReps } from './exerciseWithReps';
import { week } from './week';
import { goal } from './goal';
import { day } from './day';
import { author } from './author';

export const schemaTypes = [
  //Documents
  equipment,
  exercise,
  program,
  target,
  week,
  workout,

  //Objects
  author,
  content,
  day,
  exerciseWithReps,
  goal,
];

export default schemaTypes;
