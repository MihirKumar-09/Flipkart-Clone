import styles from "./Status.module.css";
const STATUS_FLOW = ["PLACED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"];
export default function Status({ order }) {
  const currentStep = STATUS_FLOW.indexOf(order.status);

  return (
    <div className={styles.statusContainer}>
      {STATUS_FLOW.map((status, index) => {
        const isCompleted = index <= currentStep;

        return (
          <div key={status} className={styles.statusStep}>
            <div
              className={`${styles.circle} ${
                isCompleted ? styles.green : styles.gray
              }`}
            >
              ✓
            </div>

            <span
              className={`${styles.label} ${
                isCompleted ? styles.greenText : styles.grayText
              }`}
            >
              {status.replaceAll("_", " ")}
            </span>

            {index !== STATUS_FLOW.length - 1 && (
              <div
                className={`${styles.line} ${
                  isCompleted ? styles.green : styles.gray
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
