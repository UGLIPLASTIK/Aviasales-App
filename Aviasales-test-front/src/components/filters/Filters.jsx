import { Col } from 'antd';
import styles from './filters.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange } from '../../store/filterSlice';

const Filters = () => {
  const filterStatus = useSelector((state) => state.filters.filterStatus);
  const dispatch = useDispatch();

  return (
    <Col span={8}>
      <ul className={styles.filter}>
        <h3>Количество пересадок</h3>
        <li>
          <label style={{ width: '100%' }}>
            <input
              name="all"
              checked={filterStatus.all}
              onChange={(e) => {
                dispatch(handleChange(e.target.name));
              }}
              type="checkbox"
              className={styles.checkbox}
            />
            Все
          </label>
        </li>
        <li>
          <label style={{ width: '100%' }}>
            <input
              name="0"
              checked={filterStatus[0]}
              onChange={(e) => {
                dispatch(handleChange(e.target.name));
              }}
              type="checkbox"
              className={styles.checkbox}
            />
            Без пересадок
          </label>
        </li>
        <li>
          <label style={{ width: '100%' }}>
            <input
              name="1"
              checked={filterStatus[1]}
              onChange={(e) => {
                dispatch(handleChange(e.target.name));
              }}
              type="checkbox"
              className={styles.checkbox}
            />
            1 пересадка
          </label>
        </li>
        <li>
          <label style={{ width: '100%' }}>
            <input
              name="2"
              checked={filterStatus[2]}
              onChange={(e) => {
                dispatch(handleChange(e.target.name));
              }}
              type="checkbox"
              className={styles.checkbox}
            />
            2 пересадки
          </label>
        </li>
        <li>
          <label style={{ width: '100%' }}>
            <input
              name="3"
              checked={filterStatus[3]}
              onChange={(e) => {
                dispatch(handleChange(e.target.name));
              }}
              type="checkbox"
              className={styles.checkbox}
            />
            3 пересадки
          </label>
        </li>
      </ul>
    </Col>
  );
};

export default Filters;
