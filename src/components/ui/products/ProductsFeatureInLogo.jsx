import styled from "styled-components";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const FeaturesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 50px auto;
  gap: 20px;
  flex-wrap: wrap;
`;

const FeatureCard = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: #fff;
  border-radius: 15px;
  padding: 25px 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
  h3 {
    margin-top: 10px;
    font-size: 1.5rem;
    color: #333;
  }
  p {
    margin-top: 5px;
    font-size: 1.3rem;
    color: #666;
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  color: #ff6f3c;
`;

export default function ProductsFeatureInLogo() {
  const { t } = useTranslation(["product"]);

  const features = useMemo(
    () => [
      { icon: "🚚", title: t("features.fastDelivery.title"), desc: t("features.fastDelivery.desc") },
      { icon: "💳", title: t("features.securePayment.title"), desc: t("features.securePayment.desc") },
      { icon: "⭐", title: t("features.qualityProducts.title"), desc: t("features.qualityProducts.desc") },
      { icon: "📞", title: t("features.support247.title"), desc: t("features.support247.desc") },
    ],
    [t]
  );

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <FeaturesWrapper>
        {features.map((feature, idx) => (
          <FeatureCard key={idx}>
            <Icon>{feature.icon}</Icon>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </FeatureCard>
        ))}
      </FeaturesWrapper>
    </motion.div>
  );
}
