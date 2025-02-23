import { Col } from 'antd';
import { arrayOf, object } from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filters } from '../../store/filterSlice';
import { handleSortChange, sorting } from '../../store/sortingSlice';
import {
  addVisible,
  fetchSearchId,
  fetchTickets,
  loading,
  searchId,
  tickets,
  visibleTickets,
} from '../../store/ticketsSlice';
import Loader from '../Loader/Loader';
import Ticket from '../ticket/';
import styles from './ticket-list.module.scss';
import ticketsWithFilters from './utils';

const TicketList = () => {
  const dispatch = useDispatch();
  const id = useSelector(searchId);
  const sortState = useSelector(sorting);
  const loadingState = useSelector(loading);
  const actualTickets = useSelector(tickets);
  const selectedSorting = Object.keys(sortState).find((key) => sortState[key] === true);
  const selectedFilters = useSelector(filters);
  const show = useSelector(visibleTickets);

  useEffect(() => {
    if (!id) dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingState && id) {
        dispatch(fetchTickets(id));
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [id, loadingState]);

  const setActive = (bool) => {
    if (bool) return styles.active;
  };

  const filteredTickets = useMemo(() => {
    return ticketsWithFilters(actualTickets, selectedSorting, selectedFilters);
  }, [actualTickets, selectedSorting, selectedFilters]);

  return (
    <Col span={16}>
      <section className={styles.main}>
        <div className={styles.filterButtons}>
          <button
            onClick={(e) => dispatch(handleSortChange(e.target.id))}
            id="cheap"
            className={[`${styles.filterBtn}`, setActive(sortState.cheap)].join(' ')}
          >
            САМЫЙ ДЕШЕВЫЙ
          </button>
          <button
            onClick={(e) => dispatch(handleSortChange(e.target.id))}
            id="fast"
            className={[`${styles.filterBtn}`, setActive(sortState.fast)].join(' ')}
          >
            САМЫЙ БЫСТРЫЙ
          </button>
          <button
            onClick={(e) => dispatch(handleSortChange(e.target.id))}
            id="optimal"
            className={[`${styles.filterBtn}`, setActive(sortState.optimal)].join(' ')}
          >
            ОПТИМАЛЬНЫЙ
          </button>
        </div>
        <Loader />
        <h2 hidden={filteredTickets.length}>Рейсов, подходящих под заданные фильтры, не найдено</h2>
        <div className={styles.ticketList}>
          {filteredTickets.map((ticket, i) => {
            if (i < show) {
              return <Ticket ticket={ticket} key={i} />;
            }
          })}
          <button
            onClick={() => {
              dispatch(addVisible());
            }}
            className={[`${styles.filterBtn}`, `${styles.active}`].join(' ')}
          >
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
          </button>
        </div>
      </section>
    </Col>
  );
};

export default TicketList;

TicketList.propTypes = {
  tickets: arrayOf(object),
};
