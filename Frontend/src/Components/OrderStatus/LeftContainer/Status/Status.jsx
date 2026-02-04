import styles from "./Status.module.css";

const STATUS_FLOW = [
  { key: "PLACED", label: "Order Placed" },
  { key: "CONFIRMED", label: "Order Confirmed" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { key: "DELIVERED", label: "Delivered" },
];

export default function Status({ order }) {
  const isDelivered = order.status === "DELIVERED";

  // ✅ If delivered → show only 2 states
  const visibleSteps = isDelivered
    ? [
        { key: "PLACED", label: "Order Placed", date: order.createdAt },
        { key: "DELIVERED", label: "Delivered", date: order.deliveredAt },
      ]
    : STATUS_FLOW.map((step) => ({
        ...step,
        date:
          step.key === "PLACED"
            ? order.createdAt
            : step.key === "DELIVERED"
              ? order.deliveredAt
              : null,
      }));

  const currentIndex = STATUS_FLOW.findIndex((s) => s.key === order.status);

  return (
    <div className={styles.timeline}>
      {visibleSteps.map((step, index) => {
        const isCompleted = isDelivered
          ? true
          : STATUS_FLOW.findIndex((s) => s.key === step.key) <= currentIndex;

        return (
          <TimelineItem
            key={step.key}
            label={step.label}
            date={step.date}
            isCompleted={isCompleted}
            isLast={index === visibleSteps.length - 1}
          />
        );
      })}
    </div>
  );
}

function TimelineItem({ label, date, isCompleted, isLast }) {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div
          className={`${styles.circle} ${
            isCompleted ? styles.completed : styles.pending
          }`}
        >
          {isCompleted ? "✓" : ""}
        </div>

        {!isLast && (
          <div
            className={`${styles.line} ${
              isCompleted ? styles.completedLine : styles.pendingLine
            }`}
          />
        )}
      </div>

      <div className={styles.right}>
        <div className={styles.label}>{label}</div>
        <div className={styles.date}>
          {date ? new Date(date).toLocaleString() : "Pending"}
        </div>
      </div>
    </div>
  );
}
