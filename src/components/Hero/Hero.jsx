import s from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={s.hero}>
      <h1 className={s.title}>Test assignment for front-end developer</h1>
      <p className={s.text}>
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>
      <button className={s.button}>Sign Up</button>
    </section>
  );
}
