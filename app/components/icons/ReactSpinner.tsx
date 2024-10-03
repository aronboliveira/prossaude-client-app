import styles from "./ReactSpinner.module.scss";
export default function ReactSpinner({ scale = 0.8 }: { scale: number }): JSX.Element {
  return (
    <div style={{ transform: `scale(${scale})` }}>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='-11 -10.13 22 20.27' className={styles.reactSpinner}>
        <defs>
          <radialGradient id='nucleus-gradient' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
            <stop offset='0%' stopColor='#48656e' />
            <stop offset='50%' stopColor='#4f2727' />
            <stop offset='100%' stopColor='#48656e' />
          </radialGradient>
          <linearGradient id='center-ellipse-gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#48656e' />
            <stop offset='50%' stopColor='#4f2727' />
            <stop offset='100%' stopColor='#48656e' />
          </linearGradient>
          <linearGradient id='left-ellipse-gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#20b0dc' />
            <stop offset='50%' stopColor='#815816' />
            <stop offset='100%' stopColor='#20b0dc' />
          </linearGradient>
          <linearGradient id='right-ellipse-gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#815816' />
            <stop offset='50%' stopColor='#20b0dc' />
            <stop offset='100%' stopColor='#815816' />
          </linearGradient>
        </defs>
        <circle r='2' fill='url(#nucleus-gradient)' className={styles.reactNucleus} />
        <g>
          <ellipse rx='10' ry='4.5' stroke='url(#center-ellipse-gradient)' className={styles.reactCenterEllipse} />
          <ellipse
            rx='10'
            ry='4.5'
            stroke='url(#left-ellipse-gradient)'
            className={styles.reactLeftEllipse}
            transform='rotate(60)'
          />
          <ellipse
            rx='10'
            ry='4.5'
            stroke='url(#right-ellipse-gradient)'
            className={styles.reactRightEllipse}
            transform='rotate(120)'
          />
        </g>
      </svg>
    </div>
  );
}
