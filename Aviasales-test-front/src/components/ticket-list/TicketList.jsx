import { array } from 'prop-types';
import { Col } from 'antd';
import styles from './ticket-list.module.scss';
import Ticket from '../ticket/';

const TicketList = ({ tickets = [] }) => {
  console.log(tickets);
  return (
    <Col span={16}>
      <section className={styles.main}>
        <div className={styles.filterButtons}>
          <button className={[`${styles.filterBtn}`, `${styles.active}`].join(' ')}>САМЫЙ ДЕШЕВЫЙ</button>
          <button className={styles.filterBtn}>САМЫЙ БЫСТРЫЙ</button>
          <button className={styles.filterBtn}>ОПТИМАЛЬНЫЙ</button>
        </div>
        <div className={styles.ticketList}>
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          {/* {tickets.map((ticket, i) => {
            return <div key={i}>{ticket}</div>;
          })} */}
          <button className={[`${styles.filterBtn}`, `${styles.active}`].join(' ')}>ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!</button>
        </div>
      </section>
    </Col>
  );
};

export default TicketList;

TicketList.propTypes = {
  tickets: array,
};
