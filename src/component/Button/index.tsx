import styles from './Button.module.css';

export default function Button(props: any) {
  const { type = 'primary', label, children, onClick, className } = props;
  return (
    <button
      className={`${styles.button} ${styles[type]} ${className ?? ''}`}
      type="button"
      onClick={onClick}
    >
      {label ?? children}
    </button>
  );
}
