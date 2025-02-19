import { object } from 'prop-types';
import styles from './ticket.module.scss';
import Info from '../Info';

const Ticket = ({ ticket }) => {
  const { carrier } = ticket;
  const formatPrice = (number) => {
    if (String(number).length <= 3) return number;
    const startCut = String(number).length - 3;
    const result = String(number).slice(0, startCut) + ' ' + String(number).slice(startCut);
    return `${result} Р`;
  };

  return (
    <div className={styles.ticket}>
      <div className={styles.priceAndLogo}>
        <span className={styles.price}>{formatPrice(ticket.price)} </span>
        <img src={`https://images.daisycon.io/airline/?width=110&height=36&color=ffffff&iata=${carrier}`} alt="" />
      </div>
      <div className={styles.ticketInfo}>
        {ticket.segments.map((segment, i) => {
          return <Info key={i} segment={segment} />;
        })}
      </div>
    </div>
  );
};

Ticket.propTypes = {
  ticket: object.isRequired,
};

export default Ticket;
