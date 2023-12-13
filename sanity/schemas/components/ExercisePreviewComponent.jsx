import React, { useState } from 'react';
import { LinkIcon } from '@sanity/icons';
import { Flex, Text, Popover } from '@sanity/ui';

export const ExercisePreviewComponent = props => {
  const [open, setOpen] = useState(false);
  const { superset = false, renderDefault } = props;

  const handleMouseEvent = e => {
    setOpen(prev => !prev);
  };

  return (
    <Flex align='center' justify='space-between'>
      {renderDefault(props)}
      {superset && (
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
