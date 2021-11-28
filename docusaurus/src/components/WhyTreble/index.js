import React from "react";
import clsx from "clsx";
import styles from "./WhyTreble.module.css";

function WhyTrebleItem({ title, note }) {
  return (
    <div className={clsx(styles.whytreble__item)}>
      <div>
        <img src={require("../../../static/img/favicon.ico").default} />
      </div>
      <div>
        <div className={clsx(styles.whytrebleitem__title)}>{title}</div>
        <div className={clsx(styles.whytrebleitem__note)}>
          <p>{note}</p>
        </div>
      </div>
    </div>
  );
}

export default function WhyTreble({ notes }) {
  return (
    <div>
      <h1>What does Treble have to offer?</h1>
      <div className={clsx(styles.whytreble__list)}>
        {notes.map((el, i) => (
          <WhyTrebleItem key={i} {...el} />
        ))}
      </div>
    </div>
  );
}
