// متن‌های ارائهٔ کامل — تجمیع پارتیت‌ها
import type { Reading } from "../types";
import { READINGS_PART_1 } from "./readings-part-1";
import { READINGS_PART_2 } from "./readings-part-2";
import { READINGS_PART_3 } from "./readings-part-3";
import { READINGS_PART_4 } from "./readings-part-4";
import { READINGS_PART_5 } from "./readings-part-5";

export const READING_LIST: Reading[] = [
  ...READINGS_PART_1,
  ...READINGS_PART_2,
  ...READINGS_PART_3,
  ...READINGS_PART_4,
  ...READINGS_PART_5,
];
