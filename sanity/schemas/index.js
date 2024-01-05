import { exercise } from './documents/exercise';
import { equipment } from './documents/equipment';
import { target } from './documents/target';
import { blockContent } from './blockContent';
import { program } from './documents/program';
import { workout } from './documents/workout';
import { exerciseWithReps } from './exerciseWithReps';
import { week } from './week';
import { goals } from './goals';
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
  blockContent,
  day,
  exerciseWithReps,
  goals,
  week,
];

export default schemaTypes;
