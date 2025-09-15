import { useState, useEffect } from "react";
import { Col, Row } from "antd";

import { SearchMap, VendorList, VendorFilter, Loading } from "@/components";

import useSearchMapVendor from "@/hooks/searchMapVendor/useSearchMapVendor";
import { useGeolocation } from "@/hooks/useGeolocation/useGeolocation";

export default function SearchMapVendorPage() {
  const { isLoading, error, vendorsWithCoords } = useSearchMapVendor();
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [radius, setRadius] = useState(0);
  const { position, getPosition } = useGeolocation({ lat: 16.0544, lng: 108.2022 });

  useEffect(() => {
    setFilteredVendors(vendorsWithCoords);
    getPosition();
  }, [vendorsWithCoords]);

  return (
    <Row>
      <Col md={12}>
        <Loading isLoading={isLoading} error={error}>
          <VendorFilter
            radius={radius}
            setRadius={setRadius}
            vendors={vendorsWithCoords}
            onFilter={setFilteredVendors}
            currentPosition={position}
          />
          <VendorList vendors={filteredVendors} />
        </Loading>
      </Col>
      <Col md={12}>
        <SearchMap radius={radius} vendors={filteredVendors} position={position} />
      </Col>
    </Row>
  );
}
