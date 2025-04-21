import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { PluginLunar } from "dayjs-plugin-lunar";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(PluginLunar);

dayjs.tz.setDefault(process.env.NEXT_PUBLIC_TZ);

export { dayjs };
