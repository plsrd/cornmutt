import React, { useState, useEffect, use } from 'react';
import { LinkIcon } from '@sanity/icons';
import { Flex, Text, Popover } from '@sanity/ui';
import { set, useFormValue } from 'sanity';
import { supersetColors } from '@/sanity/lib/supersetColors';

export const ExercisePreviewComponent = props => {
  const { superset, renderDefault, _key: key } = props;
  const [open, setOpen] = useState(false);
  const [isSupersetMember, setIsSupersetMember] = useState(superset);
  const [groupColorIndex, setGroupColorIndex] = useState(null);
  const parent = useFormValue(['exercises']);

  const groupBySuperset = array => {
    if (!array.length) return [];
    return array.reduce((groups, item, index) => {
      //If the current item is a superset and the previous item is not, start a new group
      if (item?.superset && !array[index - 1]?.superset) {
        groups.push([item]);
        //If the current item is a superset or the previous item is a superset, add it to a group
      } else if (item?.superset || array[index - 1]?.superset) {
        //Create a new group if there are no groups yet
        if (groups.length === 0) {
          groups.push([item]);
        } else {
          //Add the item to the last group if there are groups
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
        //If the current exercise is not a superset, check if the previous exercise is
        const prevIndex = parent.findIndex(({ _key }) => _key === key) - 1;

        setIsSupersetMember(parent?.[prevIndex]?.superset);
      }

      //Get all the superset groups
      const groups = groupBySuperset(parent).map(group =>
        group.map(({ _key }) => _key)
      );
      //Find the index of the current exercise's superset group
      const groupIndex = groups.findIndex(group => group.includes(key));

      //Set the group color based on the index
      if (groupIndex < 2) {
        setGroupColorIndex(groupIndex);
      } else {
        setGroupColorIndex(groupIndex % 2);
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
              style={{ fontSize: 24, color: supersetColors[groupColorIndex] }}
            />
          </div>
        </Popover>
      )}
    </Flex>
  );
};
