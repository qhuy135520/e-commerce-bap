import { Col, Row } from "antd";

import { Loading, SearchMap } from "@/components";
import useSearchMapVendor from "@/hooks/searchMapVendor/useSearchMapVendor";

export default function SearchMapVendorPage() {
  const { isLoading, error, vendors } = useSearchMapVendor();
  console.log(vendors);

  return (
    <Loading isLoading={isLoading} error={error}>
      <Row>
        <Col xs={24} md={12}></Col>
        <Col xs={24} md={12}>
          <SearchMap />
        </Col>
      </Row>
    </Loading>
  );
}
