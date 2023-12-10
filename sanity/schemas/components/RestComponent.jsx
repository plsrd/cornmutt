import React from 'react'
import {useEffect} from 'react'
import {unset, useFormValue} from 'sanity'
import {Stack, TextInput, Text} from '@sanity/ui'

export const RestComponent = (props) => {
  const {path, elementProps, renderDefault, onChange} = props
  const {superSet} = useFormValue(path.slice(0, 2))

  useEffect(() => {
    if (superSet) {
      onChange(unset())
    }
  }, [superSet, onChange])

  const fwdProps = {
    ...elementProps,
    readOnly: superSet,
  }

  return (
    <Stack space={2}>
      <TextInput {...fwdProps} />
      {superSet && (
        <Text size={0}>
          This exercise is part of a superset. There is no rest when moving between exercises in a
          superset.
        </Text>
      )}
    </Stack>
  )
}
