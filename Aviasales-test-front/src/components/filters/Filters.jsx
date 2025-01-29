import { Col } from 'antd';
import styles from './filters.module.scss';

const Filters = () => {
  console.log(styles);
  return (
    <Col span={8}>
      <ul className={styles.filter}>
        <h3>Количество пересадок</h3>
        <li>
          <label style={{ width: '100%' }}>
            <input type="checkbox" className={styles.checkbox} />
            Все
          </label>
        </li>
        <li>
          <label style={{ width: '100%' }}>
            <input type="checkbox" className={styles.checkbox} />
            Без пересадок
          </label>
        </li>
        <li>
          <label style={{ width: '100%' }}>
            <input type="checkbox" className={styles.checkbox} />1 пересадка
          </label>
        </li>
        <li>
          <label style={{ width: '100%' }}>
            <input type="checkbox" className={styles.checkbox} />2 пересадки
          </label>
        </li>
        <li>
          <label style={{ width: '100%' }}>
            <input type="checkbox" className={styles.checkbox} />3 пересадки
          </label>
        </li>
      </ul>
    </Col>
  );
};

export default Filters;
