// فهرست کامل داستان‌های Advanced Steps to Understanding — تجمیع پارتیت‌ها
import type { Reading } from "../types";
import { READINGS_PART_1 } from "./readings-part-1";
import { READINGS_PART_2 } from "./readings-part-2";
import { READINGS_PART_3 } from "./readings-part-3";

export const READING_LIST: Reading[] = [
  ...READINGS_PART_1,
  ...READINGS_PART_2,
  ...READINGS_PART_3,
];
