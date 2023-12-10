import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from 'sanity-codegen';

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Exercise
 *
 *
 */
export interface Exercise extends SanityDocument {
  _type: 'exercise';

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Main Target Muscle — `reference`
   *
   * Select the muscle this exercise targets
   */
  target?: SanityReference<Target>;

  /**
   * Main Equipment — `reference`
   *
   * Select the main piece of equipment needed for this exercise
   */
  equipment?: SanityReference<Equipment>;

  /**
   * Instructions — `array`
   *
   * Enter the instructions for this exercise
   */
  instructions?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Video — `url`
   *
   * Enter the URL for a video of this exercise
   */
  video?: string;

  /**
   * Demo Image — `image`
   *
   * Upload images for this exercise
   */
  demoImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * Equipment
 *
 *
 */
export interface Equipment extends SanityDocument {
  _type: 'equipment';

  /**
   * Name — `string`
   *
   *
   */
  name?: string;
}

/**
 * Target
 *
 *
 */
export interface Target extends SanityDocument {
  _type: 'target';

  /**
   * Name — `string`
   *
   *
   */
  name?: string;
}

/**
 * Program
 *
 *
 */
export interface Program extends SanityDocument {
  _type: 'program';

  /**
   * Program Name — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `content`
   *
   *
   */
  description?: Content;

  /**
   * Program Length in Weeks — `number`
   *
   *
   */
  length?: number;

  /**
   * Workout Days Per Week — `number`
   *
   *
   */
  days?: number;
}

/**
 * Workout
 *
 *
 */
export interface Workout extends SanityDocument {
  _type: 'workout';

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Use Workout Builder Assistance? — `boolean`
   *
   * If you are unsure of how to build a workout that fits your intended focus, toggle this to enable validation on your fields.
   */
  useBuilderAssistance?: boolean;

  /**
   * Focus — `array`
   *
   * Select the training focus for this workout.
   */
  focus?: Array<SanityKeyed<string>>;

  /**
   * Target Muscle Group(s) — `array`
   *
   * Select the target muscle group(s) for this workout. If no muscle groups are selected, all exercises will be available.
   */
  target?: Array<SanityKeyedReference<Target>>;

  /**
   * Equipment — `array`
   *
   * Select equipment to limit the exercises in this workout. If no equipment is selected, all exercises will be available.
   */
  equipment?: Array<SanityKeyedReference<Equipment>>;

  /**
   * Exercises — `array`
   *
   *
   */
  exercises?: Array<SanityKeyed<ExerciseWithReps>>;
}

export type Content = Array<SanityKeyed<SanityBlock>>;

export type ExerciseWithReps = {
  _type: 'exerciseWithReps';
  /**
   * Exercise — `reference`
   *
   * Not seeing the exercises you'd like? Try adjusting your target muscle groups and equipment.
   */
  exercise?: SanityReference<Exercise>;

  /**
   * Sets/Reps — `object`
   *
   *
   */
  info?: {
    _type: 'info';
    /**
     * Sets — `number`
     *
     *
     */
    sets?: number;

    /**
     * Reps — `number`
     *
     *
     */
    reps?: number;

    /**
     * Rest — `number`
     *
     *
     */
    restTime?: number;
  };

  /**
   * Super Set — `boolean`
   *
   * Superset with next exercise?
   */
  superSet?: boolean;

  /**
   * Notes — `text`
   *
   * (Optional)
   */
  notes?: string;
};

export type Documents = Exercise | Equipment | Target | Program | Workout;
