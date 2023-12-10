import { FieldProps, useFormValue } from 'sanity';

export const RestComponent = (props: FieldProps) => {
  const { path } = props;
  const { superSet } = useFormValue(path.slice(0, 2)) as { superSet: boolean };

  return <>{!superSet && props.renderDefault(props)}</>;
};
