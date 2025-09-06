import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SocialGroup, FooterStyled } from "@/components";

const logos = ["0 0", "-85px 0", "-170px 0"];

export default function Footer() {
  const { t } = useTranslation(["common"]);
  return (
    <FooterStyled.Footer>
      <FooterStyled.Container>
        <FooterStyled.RowFooter gutter={[24, 36]} justify="space-around">
          <Col xs={24} sm={12} lg={6}>
            <FooterStyled.Info>
              <b>{t("footer.supportHotline")}</b>
              <p>
                {t("footer.buy")}: <FooterStyled.Phone>1900 232 461</FooterStyled.Phone>{" "}
              </p>
              <p>
                {t("footer.complaint")}: <FooterStyled.Phone>1800 1063</FooterStyled.Phone>{" "}
              </p>
            </FooterStyled.Info>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FooterStyled.Info>
              <b> {t("footer.aboutCompany")}</b>
              <p>
                <NavLink to="about">{t("footer.introCompany")}</NavLink>
              </p>
            </FooterStyled.Info>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FooterStyled.Info>
              <b>{t("footer.groupWebsite")}</b>
              <FooterStyled.RowLogo>
                {logos.map((pos, i) => (
                  <FooterStyled.Logo key={i} $position={pos} />
                ))}
              </FooterStyled.RowLogo>
            </FooterStyled.Info>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FooterStyled.Info>
              <b>{t("footer.contact")}</b>
              <SocialGroup />
            </FooterStyled.Info>
          </Col>
        </FooterStyled.RowFooter>
      </FooterStyled.Container>
    </FooterStyled.Footer>
  );
}
