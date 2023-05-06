import React from "react";
import styles from "./Notification.module.css";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const message = notification.message;
  const type = notification.type;

  if (message === '') {
    return null;
  }

  if (type === "success") {
    return <p className={styles.success}>{message}</p>;
  } else {
    return <p className={styles.fail}>{message}</p>;
  }
};

export default Notification;
