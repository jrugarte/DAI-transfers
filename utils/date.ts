const TIME_UNITS: { [key: string]: number } = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

const getSecondsDifference = (timestamp: number): number =>
  (Date.now() - timestamp) / 1000;

type RelativeTimeFormatUnit =
  | "year"
  | "years"
  | "quarter"
  | "quarters"
  | "month"
  | "months"
  | "week"
  | "weeks"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds";

interface UnitAndValue {
  value: number;
  unit: string;
}

const getUnitAndValueDate = (
  elapsedSeconds: number
): UnitAndValue | undefined => {
  for (const [unit, secondsInUnit] of Object.entries(TIME_UNITS)) {
    if (elapsedSeconds >= secondsInUnit || unit === "second") {
      const value = Math.floor(elapsedSeconds / secondsInUnit) * -1;
      return { value, unit };
    }
  }
};

export const getRelativeTime = (timestamp: number, locale: string): string => {
  const rtf = new Intl.RelativeTimeFormat(locale);

  const elapsedSeconds = getSecondsDifference(timestamp);
  const unitAndValue = getUnitAndValueDate(elapsedSeconds);

  if (!unitAndValue) return "";

  const { unit, value } = unitAndValue;
  return rtf.format(value, unit as RelativeTimeFormatUnit);
};
