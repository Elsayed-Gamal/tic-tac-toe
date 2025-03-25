import styles from './Cell.module.css';

function Cell({ onClick }) {
  return <div className={styles.cell} onClick={onClick}></div>;
}

export default Cell;
