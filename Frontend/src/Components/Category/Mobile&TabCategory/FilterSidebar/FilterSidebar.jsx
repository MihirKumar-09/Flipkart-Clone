import Brand from "./BrandFilter";
import Ram from "./RamFilter";
import NetworkType from "./NetworkType";
import InternalStorage from "./InternalStorage";
import Type from "./TypeFilter";
import Processor from "./ProcessorBrand";
import OperatingSystem from "./OperatingSystem";
import Speciality from "./Speciality";
import SimType from "./SimType";
import ScreenSize from "./ScreenSize";
import Price from "./Price";
import Features from "./Features.jsx";
import Offers from "./Offers.jsx";
import InVoice from "./InVoice.jsx";

export default function FilterSidebar() {
  return (
    <div className="filter-sidebar">
      <Brand />
      <Ram />
      <NetworkType />
      <InternalStorage />
      <Type />
      <Processor />
      <OperatingSystem />
      <Speciality />
      <SimType />
      <ScreenSize />
      <Price />
      <Features />
      <Offers />
      <InVoice />
    </div>
  );
}
