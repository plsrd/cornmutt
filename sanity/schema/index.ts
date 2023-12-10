import { type SchemaTypeDefinition } from 'sanity';
import { exercise } from './documents/exercise';
import { equipment } from './documents/equipment';
import { target } from './documents/target';
import { content } from './content';
import { program } from './documents/program';
import { workout } from './documents/workout';
import { exerciseWithReps } from './exerciseWithReps';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //Documents
    exercise,
    equipment,
    target,
    program,
    workout,

    //Objects
    content,
    exerciseWithReps,
  ],
};

export default schema.types;
