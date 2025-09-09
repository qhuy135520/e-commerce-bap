import { Button, Card, Input, Typography } from "antd";
import styled from "styled-components";

export const WrapperCard = styled(Card)`
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

export const ProductRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.h3`
  font-size: 15px;
  font-weight: 500;
  margin: 0;
`;

export const ProductQuantity = styled.p`
  color: #6b7280; /* text-gray-500 */
  font-size: 13px;
  margin: 4px 0 0 0;
`;

export const PriceWrapper = styled.div`
  text-align: right;
`;

export const Price = styled.p`
  color: #374151; /* text-gray-700 */
  font-size: 14px;
  margin: 0;
`;
export const Wrapper = styled.div`
  max-width: 1100px;
  margin: 100px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const StyledButton = styled(Button)`
  margin-top: 16px;
  float: right; /* đẩy sang phải */
  font-size: 14px; /* chỉnh nhỏ hơn một chút */
  padding: 0 20px;

  &:hover {
    opacity: 0.9;
  }
`;

export const Section = styled(Card)`
  border-radius: 8px;
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
export const AddressTitle = styled(Typography.Title)`
  margin: 0;
  color: #f5222d !important;
`;

export const FormGroup = styled.div`
  margin-bottom: 12px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
`;

export const InputField = styled(Input)`
  width: 100%;
`;

export const TextArea = styled(Input.TextArea)`
  width: 100%;
`;

export const ErrorText = styled(Typography.Text)`
  color: red;
  font-size: 12px;
`;

export const ButtonGroup = styled.div`
  text-align: right;
  margin-top: 8px;

  & > button {
    margin-left: 8px;
  }
`;

export const ShopName = styled(Typography.Text)`
  font-size: 16px;
  font-weight: bold;
`;

export const TotalText = styled(Typography.Text)`
  font-size: 18px;
  color: red;
`;

export const GrandTotalText = styled(Typography.Text)`
  font-size: 20px;
  color: red;
`;

export const ModalTitle = styled.div`
  text-align: center;
`;

export const PaymentMethodWrapper = styled.div`
  margin-top: 8px;
`;

export const BalanceText = styled(Typography.Text)`
  margin-left: 24px;
  display: block;
`;

export const PaymentDetailWrapper = styled.div`
  margin-top: 16px;
`;

export const AlertWrapper = styled.div`
  margin-top: 12px;
`;

export const PlaceOrderButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
`;
