import { useTranslation } from "react-i18next";

import { AboutStyled, HeadingStyled } from "@/components";

import AboutImg from "@/assets/images/about/about-img.jpg";
import AboutImg2 from "@/assets/images/about/about-img-2.png";

export default function About() {
  const { t } = useTranslation(["common"]);
  return (
    <AboutStyled.About>
      <HeadingStyled as="h2">{t("about.title1")}</HeadingStyled>
      <AboutStyled.Img src={AboutImg} alt="About Image" />
      <p>{t("about.desc1")}</p>
      <hr />
      <HeadingStyled as="h2">{t("about.title2")}</HeadingStyled>
      <img src={AboutImg2} alt="About Image" />

      <p>{t("about.desc2")}</p>
    </AboutStyled.About>
  );
}
