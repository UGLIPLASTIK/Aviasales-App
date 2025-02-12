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
              name="noOne"
              checked={filterStatus.noOne}
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
              name="one"
              checked={filterStatus.one}
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
              name="two"
              checked={filterStatus.two}
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
              name="three"
              checked={filterStatus.three}
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
