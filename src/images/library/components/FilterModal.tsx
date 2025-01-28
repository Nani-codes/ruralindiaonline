import Button from "@/component/Button";
import Filters from "./Filters";
import styles from "../../../styles/library.module.css";
import Link from "next/link";

export default function FilterModal({
  type,
  types,
  selectTypes,
  room,
  rooms,
  selectFilters,
  navigate,
  open,
  setOpen,
}: any) {

  const onClose = (e: any) => {
    e?.preventDefault?.();
    setOpen(false);
  };

  const onClick = (e: any) => {
    setOpen(false);
    navigate?.(e);
  };

  return (
    <>
      <div
        className={styles["filter-wrapper"]}
        style={{ right: open ? 0 : -548 }}
      >
        <div className={styles["filter-header"]}>
          <Link href="/" onClick={onClose}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L1 11M1 1L11 11"
                stroke="#B82929"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

        </div>
       
        <div className={styles["filter-contents"]}>
        <h1 className={styles['h1']}>Choose filters to apply</h1>
          <Filters
            type={type}
            types={types}
            selectTypes={selectTypes}
            room={room}
            rooms={rooms}
            selectFilters={selectFilters}
            // navigate={navigate}
          />
        </div>
        <div className={styles["filter-footer"]}>
          <Button label="Apply filters" onClick={onClick} />
        </div>
      </div>
      <div
        className={styles["filter-overlay"]}
        style={{ display: open ? "block" : "none" }}
        onClick={onClose}
      />
    </>
  );
}
