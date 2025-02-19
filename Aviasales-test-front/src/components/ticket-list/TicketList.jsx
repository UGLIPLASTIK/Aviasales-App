import { Col } from 'antd';
import { arrayOf, object } from 'prop-types';
import { useEffect } from 'react';
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

  const ticketsWithFilters = (tickets = [], sortingState, filterState) => {
    // const filterTickets = (tickets) => {
    //   if (filterState.all) return tickets;
    //   if (!Object.values(filterState).includes(true)) return tickets;
    //   const filters = [];
    //   for (const key in filterState) {
    //     if (filterState[key]) filters.push(key);
    //   }
    //   const ticketsWithStops = tickets.map((ticket) => {
    //     const stops = [];
    //     ticket.segments.forEach((segment) => stops.push(segment.stops.length));
    //     return { ...ticket, stops };
    //   });
    //   if (filters.length === 1) return ticketsWithStops.filter((ticket) => ticket.stops.includes(Number(filters[0])));
    //   if (filters.length === 2)
    //     return ticketsWithStops.filter(
    //       (ticket) => ticket.stops.includes(Number(filters[0])) || ticket.stops.includes(Number(filters[1]))
    //     );
    //   if (filters.length === 3)
    //     return ticketsWithStops.filter(
    //       (ticket) =>
    //         ticket.stops.includes(Number(filters[0])) ||
    //         ticket.stops.includes(Number(filters[1])) ||
    //         ticket.stops.includes(Number(filters[2]))
    //     );
    //   return ticketsWithStops.filter((ticket) => ticket.stops.includes(2) && ticket.stops.includes(0));
    // };
    const filterTickets = (tickets) => {
      if (filterState.all || !Object.values(filterState).includes(true)) {
        return tickets;
      }
      const activeFilters = Object.keys(filterState).filter((key) => filterState[key]);
      if (activeFilters.length === 0) {
        return tickets;
      }
      return tickets.filter((ticket) => {
        const stops = ticket.segments.map((segment) => segment.stops.length);
        return activeFilters.some((filter) => stops.includes(Number(filter)));
      });
    };
    const filteredTickets = filterTickets(tickets);

    const optimalSorting = (tickets) => {
      const prices = tickets.map((ticket) => ticket.price);
      let durations = tickets.map((ticket) => ticket.segments.map((segment) => segment.duration));
      durations = durations.map((durations) => durations[0] + durations[1]);
      const ticketsWithDuration = tickets.map((ticket, i) => ({ ...ticket, allDuration: durations[i] }));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const minDuration = Math.min(...durations);
      const maxDuration = Math.max(...durations);
      const normalizedTickets = ticketsWithDuration.map((ticket) => ({
        ...ticket,
        normalizedPrice: (ticket.price - minPrice) / (maxPrice - minPrice),
        normalizedDuration: (ticket.allDuration - minDuration) / (maxDuration - minDuration),
      }));
      const weightPrice = 0.5;
      const weightDuration = 0.5;
      const scoredTickets = normalizedTickets.map((ticket) => ({
        ...ticket,
        score: weightPrice * ticket.normalizedPrice + weightDuration * ticket.normalizedDuration,
      }));
      return scoredTickets;
    };
    const fastSorting = filteredTickets.toSorted((a, b) => {
      const aDuration = a.segments.reduce((acc, el) => {
        return acc + el.duration;
      }, 0);
      const bDuration = b.segments.reduce((acc, el) => {
        return acc + el.duration;
      }, 0);
      return aDuration - bDuration;
    });

    if (sortingState === 'cheap') return filteredTickets.toSorted((a, b) => a.price - b.price);
    if (sortingState === 'fast') return fastSorting;
    if (sortingState === 'optimal') return optimalSorting(filteredTickets).toSorted((a, b) => a.score - b.score);
    return filteredTickets;
  };

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
        <Loader />
        <div className={styles.ticketList}>
          {ticketsWithFilters(actualTickets, selectedSorting, selectedFilters).map((ticket, i) => {
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
