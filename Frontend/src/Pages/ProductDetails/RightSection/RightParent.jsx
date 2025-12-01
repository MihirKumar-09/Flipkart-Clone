import ProductDetails from "./ProductDetails.jsx";
import Specification from "./Specification.jsx";
import ProductDiscription from "./ProductDiscription.jsx";
export default function RightParent() {
  return (
    <div
      style={{
        marginTop: "70px",
        width: "100%",
        height: "620px",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <ProductDetails />
      <Specification />
      <ProductDiscription />
    </div>
  );
}
