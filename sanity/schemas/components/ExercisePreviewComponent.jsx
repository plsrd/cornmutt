import React, { useState, useEffect, use } from 'react';
import { LinkIcon } from '@sanity/icons';
import { Flex, Text, Popover } from '@sanity/ui';
import { set, useFormValue } from 'sanity';
import { supersetColors } from '@/sanity/lib/supersetColors';

export const ExercisePreviewComponent = props => {
  const { superset, renderDefault, _key: key } = props;
  const [open, setOpen] = useState(false);
  const [isSupersetMember, setIsSupersetMember] = useState(superset);
  const [groupColor, setGroupColor] = useState(null);
  const parent = useFormValue(['exercises']);

  const groupBySuperset = array => {
    if (!array.length) return [];
    return array.reduce((groups, item, index) => {
      if (item?.superset && !array[index - 1]?.superset) {
        groups.push([item]);
      } else if (item?.superset || array[index - 1]?.superset) {
        if (groups.length === 0 || !groups[groups.length - 1][0]?.superset) {
          groups.push([item]);
        } else {
          groups[groups.length - 1].push(item);
        }
      }
      return groups;
    }, []);
  };

  useEffect(() => {
    if (superset) {
      setIsSupersetMember(superset);
    }
    if (parent) {
      if (!superset) {
        const prevIndex = parent.findIndex(({ _key }) => _key === key) - 1;

        setIsSupersetMember(parent?.[prevIndex]?.superset);
      }

      const groups = groupBySuperset(parent).map(group =>
        group.map(({ _key }) => _key)
      );

      const groupIndex = groups.findIndex(group => group.includes(key));

      if (groupIndex < 2) {
        setGroupColor(groupIndex);
      } else {
        setGroupColor(groupIndex % 2);
      }
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
            <LinkIcon
              style={{ fontSize: 24, color: supersetColors[groupColor] }}
            />
          </div>
        </Popover>
      )}
    </Flex>
  );
};
