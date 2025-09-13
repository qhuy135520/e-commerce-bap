import { SearchMap, VendorList, VendorFilter } from "@/components";
import useSearchMapVendor from "@/hooks/searchMapVendor/useSearchMapVendor";
import { Col, Row } from "antd";
import { Loading } from "@/components";
import { useState, useEffect } from "react";
import { useGeolocation } from "@/hooks/useGeolocation/useGeolocation";

export default function SearchMapVendorPage() {
  const { isLoading, error, vendorsWithCoords } = useSearchMapVendor();
  const [filteredVendors, setFilteredVendors] = useState([]);
  const { position, getPosition } = useGeolocation({ lat: 16.0544, lng: 108.2022 });

  useEffect(() => {
    setFilteredVendors(vendorsWithCoords);
    getPosition();
  }, [vendorsWithCoords]);

  return (
    <Row>
      <Col md={12}>
        <Loading isLoading={isLoading} error={error}>
          <VendorFilter vendors={vendorsWithCoords} onFilter={setFilteredVendors} currentPosition={position} />
          <VendorList vendors={filteredVendors} />
        </Loading>
      </Col>
      <Col md={12}>
        <SearchMap vendors={filteredVendors} position={position} />
      </Col>
    </Row>
  );
}
