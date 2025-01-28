import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './MainHeader.module.css';

export default function Menu({
  open,
  onClose,
  active,
  setVisible,
  selected,
  visible,
}: any) {
  const { locale } = useRouter();

  const handleClick = () => {
    onClose?.();
  };
  return (
    <div
      className={styles['sub-header-wrapper']}
      style={{ top: open ? 60 : -1000 }}
    >
      <div className={styles['mobile-header']}>
        <div className={styles['menu-mobile']}>
          <Link href="/library?page=1" locale={locale} onClick={handleClick}>
            Library
          </Link>
          <Link
            href="/donate"
            className={active === 'donate' ? styles.active : ''}
            locale={locale}
            onClick={handleClick}
          >
            Donate
          </Link>
          <Link href="/education" locale={locale} onClick={handleClick}>
            education
          </Link>
          <Link
            href="/childrens-paintings"
            locale={locale}
            onClick={handleClick}
          >
            Children
          </Link>
        </div>

        <button className={styles.btn} onClick={() => setVisible(!visible)}>
          <div className={styles['label-mobile']}>{selected?.[0]?.name}</div>
        </button>
      </div>
    </div>
  );
}
