const ticketsWithFilters = (tickets = [], sortingState, filterState) => {
  if (!Object.values(filterState).includes(true)) return [];
  const filterTickets = (tickets) => {
    if (filterState.all) {
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

export default ticketsWithFilters;
