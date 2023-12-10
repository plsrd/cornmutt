import React from 'react'
import {Stack, TextInput, Text} from '@sanity/ui'
import {useEffect, useState} from 'react'
import {set, useFormValue} from 'sanity'

export const SetsComponent = (props) => {
  const {path, elementProps, onChange, value} = props
  const [prevSets, setPrevSets] = useState()
  const [isSuperSetMember, setIsSuperSetMember] = useState(false)
  const parent = useFormValue(path.slice(0, 1))

  useEffect(() => {
    if (parent) {
      const prevIndex = parent.findIndex(({_key}) => _key === path[1]._key) - 1

      const prev = parent?.[prevIndex]
      const superSet = prev?.superSet || false

      if (superSet) {
        setIsSuperSetMember(superSet)
        setPrevSets(prev?.info?.sets)
      }
    }
  }, [parent, path])

  useEffect(() => {
    if (isSuperSetMember && prevSets !== value) {
      onChange(set(prevSets))
    }
  })

  const fwdProps = {
    ...elementProps,
    readOnly: isSuperSetMember,
  }

  return (
    <Stack space={2}>
      <TextInput {...fwdProps} />
      {prevSets && (
        <Text size={0}>
          This exercise is part of a superset. Sets are controlled by the first exercise in the
          superset.
        </Text>
      )}
    </Stack>
  )
}
