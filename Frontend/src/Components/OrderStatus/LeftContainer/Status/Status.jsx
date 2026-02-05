import styles from "./Status.module.css";

const STATUS_FLOW = [
  { key: "PLACED", label: "Order Placed" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { key: "DELIVERED", label: "Delivered" },
];

export default function Status({ order }) {
  if (!order || !order.status) return null;

  const isDelivered = order.status === "DELIVERED";

  // 1️⃣ Decide visible steps
  const visibleSteps = isDelivered
    ? [
        { key: "PLACED", label: "Order Placed" },
        { key: "DELIVERED", label: "Delivered" },
      ]
    : STATUS_FLOW;

  // 2️⃣ Current status index (ALWAYS from full flow)
  const currentIndex = STATUS_FLOW.findIndex((s) => s.key === order.status);

  // 3️⃣ Date mapping (NO fake dates)
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
      default:
        return null;
    }
  };

  return (
    <div className={styles.timeline}>
      {visibleSteps.map((step, index) => {
        const stepIndex = STATUS_FLOW.findIndex((s) => s.key === step.key);

        const isCompleted = isDelivered ? true : stepIndex <= currentIndex;

        return (
          <TimelineItem
            key={step.key}
            label={step.label}
            date={isCompleted ? getDateForStep(step.key) : null}
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
