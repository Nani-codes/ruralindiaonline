import styles from './Filters.module.css';

export default function Filters(props: any) {
  const { data } = props;

  return (
    <div className={styles.card}>
      <p className={styles.title}>Language</p>
      {data.map((i: any) => (
        <button key={i.name}>{i.name.split(' ')[0]}</button>
      ))}
    </div>
  );
}
