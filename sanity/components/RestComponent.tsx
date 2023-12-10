import { useEffect } from 'react';
import { InputProps, unset, useFormValue } from 'sanity';
import { Stack, TextInput, Text } from '@sanity/ui';

export const RestComponent = (props: InputProps) => {
  const { path, elementProps, renderDefault, onChange } = props;
  const { superSet } = useFormValue(path.slice(0, 2)) as { superSet: boolean };

  useEffect(() => {
    if (superSet) {
      onChange(unset());
    }
  }, [superSet, onChange]);

  const fwdProps = {
    ...elementProps,
    readOnly: superSet,
  };

  return (
    <Stack space={2}>
      <TextInput {...fwdProps} />
      {superSet && (
        <Text size={0}>
          This exercise is part of a superset. There is no rest when moving
          between exercises in a superset.
        </Text>
      )}
    </Stack>
  );
};
