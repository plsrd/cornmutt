import React, { useState, useEffect, use } from 'react';
import { LinkIcon } from '@sanity/icons';
import { Flex, Text, Popover } from '@sanity/ui';
import { set, useFormValue } from 'sanity';

export const ExercisePreviewComponent = props => {
  const { superset, renderDefault, _key: key } = props;
  const [open, setOpen] = useState(false);
  const [isSupersetMember, setIsSupersetMember] = useState(superset);
  const parent = useFormValue(['exercises']);

  useEffect(() => {
    if (superset) {
      setIsSupersetMember(superset);
      return;
    }
    if (parent) {
      const prevIndex = parent.findIndex(({ _key }) => _key === key) - 1;

      const prevIsSuperset = parent?.[prevIndex]?.superset;

      setIsSupersetMember(prevIsSuperset);
    }
  }, [parent, superset, key]);

  const handleMouseEvent = e => {
    setOpen(prev => !prev);
  };

  return (
    <Flex align='center' justify='space-between'>
      {renderDefault(props)}
      {isSupersetMember && (
        <Popover
          padding={2}
          content={<Text size={1}>This exerise is part of a superset</Text>}
          placement='top'
          open={open}
        >
          <div onMouseEnter={handleMouseEvent} onMouseLeave={handleMouseEvent}>
            <LinkIcon style={{ fontSize: 24, color: '#297343' }} />
          </div>
        </Popover>
      )}
    </Flex>
  );
};
