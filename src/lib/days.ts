import { dayjs } from '@/lib/dayjs';
import handlebars from 'handlebars';

export const fetchAnniversary = async (startDate: Date, titleTemplate: string) => {
  const startDay = dayjs.tz(startDate, process.env.NEXT_PUBLIC_TZ);
  const compileTitle = handlebars.compile(titleTemplate);
  const lunarStartYear = startDay.toLunarYear().getYear();

  return Array.from({ length: 2100 - lunarStartYear }, (_, offset) => {
    const targetDate = startDay.addLunar(offset + 1, 'year');
    const anniversaryLunarYearDiff = targetDate.toLunarYear().getYear() - lunarStartYear;
    return {
      year: targetDate.year(),
      month: targetDate.month() + 1,
      date: targetDate.date(),
      title: compileTitle({ years: anniversaryLunarYearDiff })
    };
  });
};
