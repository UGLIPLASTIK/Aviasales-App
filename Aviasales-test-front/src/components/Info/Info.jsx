import { string, arrayOf, number, PropTypes } from 'prop-types';
import styles from './styles.module.scss';
import { format } from 'date-fns';

const Info = ({ segment }) => {
  const { origin, destination, duration, stops, date } = segment;
  const stopsCount = (stops) => {
    if (stops.length === 0) return 'БЕЗ ПЕРЕСАДОК';
    else return `${stops.length} ${stops.length === 1 ? 'ПЕРЕСАДКА' : 'ПЕРЕСАДКИ'}`;
  };
  const startTime = format(new Date(date), 'HH:mm');
  const endTime = format(new Date(date).getTime() + duration * 60000, 'HH:mm');

  return (
    <div className={styles.info}>
      <div className={styles.flyInfo}>
        <div>
          <span className={styles.infoTitle}>{`${origin} - ${destination}`}</span>
          <span>{`${startTime} - ${endTime}`}</span>
        </div>
        <div>
          <span className={styles.infoTitle}>В ПУТИ</span>
          <span>{`${Math.floor(duration / 60)}ч ${duration - Math.floor(duration / 60) * 60}м`}</span>
        </div>
        <div>
          <span className={styles.infoTitle}>{stopsCount(stops)}</span>
          <span>{stops.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  segment: PropTypes.shape({
    origin: string.isRequired,
    destination: string.isRequired,
    duration: number.isRequired,
    stops: arrayOf(PropTypes.string).isRequired,
    date: string,
  }).isRequired,
};
export default Info;
