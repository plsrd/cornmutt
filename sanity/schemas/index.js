import {exercise} from './documents/exercise'
import {equipment} from './documents/equipment'
import {target} from './documents/target'
import {content} from './content'
import {program} from './documents/program'
import {workout} from './documents/workout'
import {exerciseWithReps} from './exerciseWithReps'

export const schemaTypes = [
  //Documents
  exercise,
  equipment,
  target,
  program,
  workout,

  //Objects
  content,
  exerciseWithReps,
]

export default schemaTypes
