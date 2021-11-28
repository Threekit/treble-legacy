import React from "react";
import clsx from "clsx";
import styles from "./PartOfThreekit.module.css";

export default function PartOfThreekit() {
  return (
    <div className={clsx(styles.partof)}>
      <div>Part of</div>
      <div>
        <img src={require("../../../static/img/favicon.ico").default} />
      </div>
    </div>
  );
}
