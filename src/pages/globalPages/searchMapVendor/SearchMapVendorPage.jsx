import { SearchMap, VendorList, VendorFilter } from "@/components";
import useSearchMapVendor from "@/hooks/searchMapVendor/useSearchMapVendor";
import { Col, Row } from "antd";
import { Loading } from "@/components";
import { useState, useEffect } from "react";

export default function SearchMapVendorPage() {
  const { isLoading, error, vendors } = useSearchMapVendor();
  const [filteredVendors, setFilteredVendors] = useState([]);

  useEffect(() => {
    setFilteredVendors(vendors);
  }, [vendors]);

  return (
    <Loading isLoading={isLoading} error={error}>
      <Row>
        <Col md={12}>
          <VendorFilter vendors={vendors} onFilter={setFilteredVendors} />
          <VendorList vendors={filteredVendors} />
        </Col>
        <Col md={12}>
          <SearchMap vendors={filteredVendors} />
        </Col>
      </Row>
    </Loading>
  );
}
