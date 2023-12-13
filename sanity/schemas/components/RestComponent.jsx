import React from 'react';
import { useEffect } from 'react';
import { unset, useFormValue } from 'sanity';
import { Stack, Text } from '@sanity/ui';

export const RestComponent = props => {
  const { path, elementProps, renderDefault, onChange } = props;
  const { superset } = useFormValue(path.slice(0, 2));
  useEffect(() => {
    if (superset) {
      onChange(unset());
    }
  }, [superset, onChange]);

  const fwdProps = {
    ...elementProps,
    readOnly: superset,
  };
  return (
    <Stack space={2}>
      {renderDefault({ ...props, elementProps: fwdProps })}
      {superset && (
        <Text size={0}>
          This exercise is part of a superset. There is no rest when moving
          between exercises in a superset.
        </Text>
      )}
    </Stack>
  );
};
