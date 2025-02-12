import { Col } from 'antd';
import { array } from 'prop-types';
import { handleSortChange } from '../../store/sortingSlice';
import { fetchTickets } from '../../store/ticketsReducer';
import { useSelector, useDispatch } from 'react-redux';
import Ticket from '../ticket/';
import styles from './ticket-list.module.scss';
import { useEffect } from 'react';

const TicketList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  const store = useSelector((store) => store.sorting);
  const setActive = (bool) => {
    if (bool) return styles.active;
  };
  return (
    <Col span={16}>
      <section className={styles.main}>
        <div className={styles.filterButtons}>
          <button
            onClick={(e) => dispatch(handleSortChange(e.target.id))}
            id="cheap"
            className={[`${styles.filterBtn}`, setActive(store.cheap)].join(' ')}
          >
            САМЫЙ ДЕШЕВЫЙ
          </button>
          <button
            onClick={(e) => dispatch(handleSortChange(e.target.id))}
            id="fast"
            className={[`${styles.filterBtn}`, setActive(store.fast)].join(' ')}
          >
            САМЫЙ БЫСТРЫЙ
          </button>
          <button
            onClick={(e) => dispatch(handleSortChange(e.target.id))}
            id="optimal"
            className={[`${styles.filterBtn}`, setActive(store.optimal)].join(' ')}
          >
            ОПТИМАЛЬНЫЙ
          </button>
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
