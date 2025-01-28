import styles from './Text.module.css';

export const MainTitleOne = ({ children, className }: any) => (
  <h1 className={`${styles['main-title-one']} ${className ?? ''}`}>
    {children}
  </h1>
);

export const MainHeaderTitle = ({ children, className }: any) => (
  <h1 className={`${styles['main-title-header']} ${className ?? ''}`}>
    {children}
  </h1>
);

export const RegularText = ({ children, className }: any) => (
  <div className={`${styles['regular-text']} ${className ?? ''}`}>
    {children}
  </div>
);

export const MediumTextOne = ({ children, className }: any) => (
  <h3 className={`${styles['medium-text-one']} ${className ?? ''}`}>
    {children}
  </h3>
);

export const HeadingOne = ({ children, className }: any) => (
  <h1 className={`${styles['heading-one']} ${className ?? ''}`}>{children}</h1>
);

export const HeadingTwo = ({ children, className }: any) => (
  <h1 className={`${styles['heading-two']} ${className ?? ''}`}>{children}</h1>
);

export const Label = ({ children, className }: any) => (
  <p className={`${styles['label']} ${className ?? ''}`}>{children}</p>
);

export const LabelDesc = ({ children, className }: any) => (
  <p className={`${styles['label-desc']} ${className ?? ''}`}>{children}</p>
);
