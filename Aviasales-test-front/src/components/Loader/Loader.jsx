import styles from './styles.module.scss';
import { loading } from '../../store/ticketsSlice';
import { useSelector } from 'react-redux';

const Loader = () => {
  const showLoader = useSelector(loading);
  if (!showLoader) return;
  return (
    <div className={styles.container}>
      <div className={styles.dots}>
        <div className={[`${styles.dot} ${styles['dot-1']}`].join(' ')}></div>
        <div className={[`${styles.dot} ${styles['dot-2']}`].join(' ')}></div>
        <div className={[`${styles.dot} ${styles['dot-3']}`].join(' ')}></div>
      </div>
    </div>
  );
};
export default Loader;
