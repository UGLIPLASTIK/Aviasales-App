import styles from './ticket.module.scss';

const Ticket = () => {
  const testTicket = {
    price: 13400,
    carrier: null,
    segments: [
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '10:45',
        stops: ['HKG', 'JNB'],
        duration: 1275,
      },
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '11:20',
        stops: ['HKG'],
        duration: 810,
      },
    ],
  };

  const formatPrice = (number) => {
    if (String(number).length <= 3) return number;
    const startCut = String(number).length - 3;
    const result = String(number).slice(0, startCut) + ' ' + String(number).slice(startCut);
    return `${result} Р`;
  };

  const Info = () => {
    return (
      <div className={styles.info}>
        <div className={styles.flyInfo}>
          <div>
            <span className={styles.infoTitle}>MOW – HKT</span>
            <span>10:45 – 08:00</span>
          </div>
          <div>
            <span className={styles.infoTitle}>В ПУТИ</span>
            <span>21ч 15м</span>
          </div>
          <div>
            <span className={styles.infoTitle}>2 ПЕРЕСАДКИ</span>
            <span>HKG, JNB</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.ticket}>
      <div className={styles.priceAndLogo}>
        <span className={styles.price}>{formatPrice(testTicket.price)} </span>
        <div className={styles.ticketLogo}></div>
      </div>
      <div className={styles.ticketInfo}>
        <Info />
        <Info />
      </div>
    </div>
  );
};

export default Ticket;
