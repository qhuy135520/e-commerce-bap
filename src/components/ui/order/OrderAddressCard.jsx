import { Typography, Button, Divider } from "antd";
import { FiPlusCircle, FiMapPin, FiHome, FiPhone } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { OrderStyled as OS } from "@/components/ui/order";

const { Text } = Typography;

export default function OrderAddressCard({ addressDefault, onSetEditting }) {
  const { t } = useTranslation(["order"]);
  return (
    <OS.CardStyled>
      <OS.AddressInfo direction="vertical" size={6}>
        <OS.NamePhoneWrapper size={8}>
          <FiHome size={18} color="#1677ff" />
          <Text strong>{addressDefault.name}</Text>
          <Text type="secondary">({addressDefault.phone})</Text>
        </OS.NamePhoneWrapper>

        <OS.AddressWrapper size={8}>
          <FiPhone size={16} color="#52c41a" />
          <Text>{addressDefault.fullAddress}</Text>
        </OS.AddressWrapper>

        <OS.ChangeButtonWrapper>
          <Button
            type="primary"
            ghost
            size="small"
            icon={<FiPlusCircle size={14} />}
            onClick={() => onSetEditting("addAddress")}
          >
            {t("order.addAddress")}
          </Button>
          <Divider type="vertical" />
          <Button
            type="dashed"
            size="small"
            icon={<FiMapPin size={14} />}
            onClick={() => onSetEditting("changeAddressDefault")}
          >
            {t("order.changeAddressDefault")}
          </Button>
        </OS.ChangeButtonWrapper>
      </OS.AddressInfo>
    </OS.CardStyled>
  );
}
