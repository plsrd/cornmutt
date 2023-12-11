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
  author,
  equipment,
  exercise,
  program,
  target,
  workout,

  //Objects
  content,
  day,
  exerciseWithReps,
  goal,
  week,
];

export default schemaTypes;
