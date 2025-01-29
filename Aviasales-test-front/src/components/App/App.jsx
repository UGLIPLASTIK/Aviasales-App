import styles from './app.module.scss';
import { Row } from 'antd';
import Filters from '../filters/';
import TicketList from '../ticket-list/';

const App = () => {
  return (
    <div className={styles.app}>
      <Row justify={'center'} style={{ margin: '0 auto' }}>
        <Filters />
        <TicketList />
      </Row>
    </div>
  );
};

export default App;
