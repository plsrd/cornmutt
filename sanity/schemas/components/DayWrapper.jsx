import { useEffect, useState } from 'react';
import { useFormValue } from 'sanity';
import { Stack, Text } from '@sanity/ui';

export const DayWrapper = ({ path, renderDefault, ...rest }) => {
  const day = useFormValue(path);
  const week = useFormValue(path.slice(0, -2));
  const weeks = useFormValue(path.slice(0, -3));
  const [weekNumber, setWeekNumber] = useState();
  const [dayNumber, setDayNumber] = useState();

  useEffect(() => {
    if (!day || !week?.days || !weeks) return;
    console.log(weeks, week, day);
    setWeekNumber(weeks.indexOf(week) + 1);
    setDayNumber(week.days.indexOf(day) + 1);
  }, [day, week, weeks]);

  return (
    <Stack space={2}>
      <Text size={1} weight='semibold'>
        Week {weekNumber}, Day {dayNumber}
      </Text>
      {renderDefault({ path, ...rest })}
    </Stack>
  );
};
