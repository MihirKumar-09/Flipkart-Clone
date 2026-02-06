import styles from "./Status.module.css";

const STATUS_FLOW = [
  { key: "PLACED", label: "Order Placed" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { key: "DELIVERED", label: "Delivered" },
];

const CANCELLED_STEP = {
  key: "CANCELLED",
  label: "Cancelled",
};

export default function Status({ order }) {
  if (!order || !order.status) return null;

  const isDelivered = order.status === "DELIVERED";
  const isCancelled = order.status === "CANCELLED";

  // Decide visible steps
  const visibleSteps = isCancelled
    ? [{ key: "PLACED", label: "Order Placed" }, CANCELLED_STEP]
    : isDelivered
      ? [
          { key: "PLACED", label: "Order Placed" },
          { key: "DELIVERED", label: "Delivered" },
        ]
      : STATUS_FLOW;

  const currentIndex = STATUS_FLOW.findIndex((s) => s.key === order.status);

  const getDateForStep = (key) => {
    switch (key) {
      case "PLACED":
        return order.createdAt;
      case "SHIPPED":
        return order.shippedAt;
      case "OUT_FOR_DELIVERY":
        return order.outForDeliveryAt;
      case "DELIVERED":
        return order.deliveredAt;
      case "CANCELLED":
        return order.cancelledAt;
      default:
        return null;
    }
  };

  return (
    <div className={styles.timeline}>
      {visibleSteps.map((step, index) => {
        const stepIndex = STATUS_FLOW.findIndex((s) => s.key === step.key);

        const isCompleted = isCancelled
          ? step.key === "PLACED" || step.key === "CANCELLED"
          : isDelivered
            ? true
            : stepIndex <= currentIndex;

        return (
          <TimelineItem
            key={step.key}
            label={step.label}
            date={getDateForStep(step.key)}
            isCompleted={isCompleted}
            isCancelled={step.key === "CANCELLED"}
            isLast={index === visibleSteps.length - 1}
          />
        );
      })}
    </div>
  );
}

function TimelineItem({ label, date, isCompleted, isCancelled, isLast }) {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div
          className={`${styles.circle} ${
            isCancelled
              ? styles.cancelled
              : isCompleted
                ? styles.completed
                : styles.pending
          }`}
        >
          {isCancelled ? "✕" : isCompleted ? "✓" : ""}
        </div>

        {!isLast && (
          <div
            className={`${styles.line} ${
              isCancelled
                ? styles.cancelledLine
                : isCompleted
                  ? styles.completedLine
                  : styles.pendingLine
            }`}
          />
        )}
      </div>

      <div className={styles.right}>
        <div
          className={`${styles.label} ${
            isCancelled ? styles.cancelledText : ""
          }`}
        >
          {label}
        </div>

        <div className={styles.date}>
          {date ? new Date(date).toLocaleString() : "Pending"}
        </div>
      </div>
    </div>
  );
}
