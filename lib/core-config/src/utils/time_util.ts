import moment from 'moment-timezone';

const dt = (
  mode:
    | 'millisecond'
    | 'mysql'
    | 'mysql_utc'
    | 'response'
    | 'response_utc'
    | 'ISO8601'
    | 'custom',
  datetime?: string | moment.Moment | undefined,
) => {
  let m = undefined;
  if (moment.isMoment(datetime)) {
    m = datetime;
  } else {
    m = moment(datetime);
  }

  switch (mode) {
    case 'millisecond':
      return m.valueOf().toString();
    case 'mysql':
      return m.utc().format('YYYY-MM-DD HH:mm:ss');
    case 'mysql_utc':
      return m.format('YYYY-MM-DD HH:mm:ss');
    case 'custom':
      return m.format('YYYY-MM-DDTHH:mm:ss');
    case 'response':
      return m.format('YYYY-MM-DDTHH:mm:ssZZ');
    case 'response_utc':
      return m.utc().format('YYYY-MM-DDTHH:mm:ssZZ');
    case 'ISO8601':
      return m.toISOString(true);
  }
};

const now = () => {
  return moment().tz('Asia/Jakarta');
};

const formattedDate = (
  dt: moment.Moment,
  locale: 'id' | 'en' | undefined,
): string => {
  if (locale) {
    dt = dt.locale(locale);
  }

  return dt.format('D MMMM yyyy');
};

const formattedDateTime = (dt: moment.Moment) => {
  return dt.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

export {dt, now, formattedDate, formattedDateTime};
