import css from './Gallery.module.css';

interface GridProps {
  children: React.ReactNode;
}

export function Grid({
  children
}: GridProps) {
  return (
    <section className={css.Gallery}>
      { children }
    </section>
  )
}