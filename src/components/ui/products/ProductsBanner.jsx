import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const BannerWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  padding: 50px 20px;
  background-image: url("https://ouoglhhwclawqhftzrif.supabase.co/storage/v1/object/public/ProductImage/banner.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: #fff;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
  }
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
    height: auto;
  }
`;

const BannerContent = styled.div`
  position: relative;
  max-width: 600px;
  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  button {
    padding: 14px 35px;
    font-size: 1.1rem;
    background-color: #ff6f3c;
    color: #fff;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #e6552b;
      transform: scale(1.05);
    }
  }
`;

export default function ProductBanner() {
  const { t } = useTranslation(["product"]);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <BannerWrapper>
        <BannerContent>
          <h1>{t("banner.title")}</h1>
          <p>{t("banner.description")}</p>
          <button>{t("banner.button")}</button>
        </BannerContent>
      </BannerWrapper>
    </motion.div>
  );
}
