import styles from "./Status.module.css";

const DELIVERY_FLOW = [
  { key: "PLACED", label: "Order Placed" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { key: "DELIVERED", label: "Delivered" },
];

const RETURN_FLOW = [
  { key: "RETURN_REQUESTED", label: "Return Requested" },
  { key: "RETURN_APPROVED", label: "Return Approved" },
  { key: "RETURN_COMPLETED", label: "Return Completed" },
];

const RETURN_CANCELLED_STEP = {
  key: "RETURN_CANCELLED",
  label: "Return Cancelled",
};

export default function Status({ order }) {
  if (!order || !order.status) return null;

  let visibleSteps = [];

  // 1️⃣ Order cancelled
  if (order.status === "CANCELLED") {
    visibleSteps = [
      { key: "PLACED", label: "Order Placed" },
      { key: "CANCELLED", label: "Cancelled" },
    ];
  }

  // 2️⃣ Return rejected
  else if (order.status === "RETURN_REQUEST_REJECTED") {
    visibleSteps = [
      { key: "PLACED", label: "Order Placed" },
      { key: "DELIVERED", label: "Delivered" },
      { key: "RETURN_REQUEST_REJECTED", label: "Return Rejected" },
    ];
  }

  // 3️⃣ Active return flow
  else if (order.status.startsWith("RETURN_")) {
    visibleSteps = [
      { key: "PLACED", label: "Order Placed" },
      { key: "DELIVERED", label: "Delivered" },
      ...RETURN_FLOW,
    ];
  }

  // 4️⃣ Return was cancelled by user (IMPORTANT FIX)
  else if (order.status === "DELIVERED" && order.returnRequestedAt) {
    visibleSteps = [
      { key: "PLACED", label: "Order Placed" },
      { key: "DELIVERED", label: "Delivered" },
      RETURN_CANCELLED_STEP,
    ];
  }

  // 5️⃣ Normal delivery
  else if (order.status === "DELIVERED") {
    visibleSteps = [
      { key: "PLACED", label: "Order Placed" },
      { key: "DELIVERED", label: "Delivered" },
    ];
  }

  // 6️⃣ Normal delivery flow
  else {
    visibleSteps = DELIVERY_FLOW;
  }

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
      case "RETURN_REQUESTED":
        return order.returnRequestedAt;
      case "RETURN_APPROVED":
        return order.returnApprovedAt;
      case "RETURN_COMPLETED":
        return order.returnCompleteAt;
      case "CANCELLED":
        return order.cancelledAt;
      case "RETURN_REQUEST_REJECTED":
        return order.returnRejectedAt;
      case "RETURN_CANCELLED":
        return order.updatedAt;
      default:
        return null;
    }
  };

  const allSteps = [...DELIVERY_FLOW, ...RETURN_FLOW, RETURN_CANCELLED_STEP];

  const currentIndex = allSteps.findIndex((s) => s.key === order.status);

  return (
    <div className={styles.timeline}>
      {visibleSteps.map((step, index) => {
        const stepIndex = allSteps.findIndex((s) => s.key === step.key);

        const isCancelled =
          step.key === "CANCELLED" ||
          step.key === "RETURN_REQUEST_REJECTED" ||
          step.key === "RETURN_CANCELLED";

        const isCompleted = isCancelled
          ? false
          : stepIndex !== -1 && stepIndex <= currentIndex;

        return (
          <TimelineItem
            key={step.key}
            label={step.label}
            date={getDateForStep(step.key)}
            isCompleted={isCompleted}
            isCancelled={isCancelled}
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
