import { getRelativeTime } from "../utils/date";

interface RelativeTimeProps {
  timestamp: number;
}

const RelativeTime: React.FC<RelativeTimeProps> = ({ timestamp }) => {
  const locale: string = "en-US";
  const relativeTime: string = getRelativeTime(timestamp, locale);

  const date: Date = new Date(timestamp);
  const formattedDate: string = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <time title={formattedDate} dateTime={formattedDate} className=" ">
      {relativeTime}
    </time>
  );
};

export default RelativeTime;
