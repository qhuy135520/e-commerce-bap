import { Typography } from "antd";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useTranslation } from "react-i18next";

import { RoleCard, RoleSignUpStyled as RSS, RoleCardStyled as RCS } from "@/components";

const { Title } = Typography;

export default function RoleSignUpPage() {
  const { t } = useTranslation(["auth"]);
  const roles = [
    {
      key: "customer",
      title: t("roleSignUp.roles.customer.title"),
      description: t("roleSignUp.roles.customer.description"),
      features: t("roleSignUp.roles.customer.features", {
        returnObjects: true,
      }),
      buttonText: t("roleSignUp.roles.customer.buttonText"),
      icon: <AiOutlineUser style={{ fontSize: 32, color: "var(--color-brand-500)" }} />,
      color: "var(--color-brand-500)",
    },
    {
      key: "vendor",
      title: t("roleSignUp.roles.vendor.title"),
      description: t("roleSignUp.roles.vendor.description"),
      features: t("roleSignUp.roles.vendor.features", { returnObjects: true }),
      buttonText: t("roleSignUp.roles.vendor.buttonText"),
      icon: <AiOutlineShoppingCart style={{ fontSize: 32, color: "var(--color-green-700)" }} />,
      color: "var(--color-green-700)",
    },
  ];

  return (
    <RSS.ContainerRolePage>
      <RSS.TitleWrapper>
        <Title level={2}>{t("roleSignUp.title")}</Title>
        <RSS.SubTitle>{t("roleSignUp.subtitle")}</RSS.SubTitle>
      </RSS.TitleWrapper>

      <RCS.SpaceRole direction="vertical" size="large">
        {roles.map((role) => (
          <RoleCard key={role.key} role={role} />
        ))}
      </RCS.SpaceRole>
    </RSS.ContainerRolePage>
  );
}
