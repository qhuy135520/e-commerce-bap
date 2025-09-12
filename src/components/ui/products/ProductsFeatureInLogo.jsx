import styled from "styled-components";

const features = [
  { icon: "🚚", title: "Giao hàng nhanh", desc: "Nhanh chóng và an toàn" },
  { icon: "💳", title: "Thanh toán an toàn", desc: "Bảo mật tuyệt đối" },
  { icon: "⭐", title: "Sản phẩm chất lượng", desc: "Đảm bảo hài lòng" },
  { icon: "📞", title: "Hỗ trợ 24/7", desc: "Luôn sẵn sàng phục vụ" },
];

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
  return (
    <FeaturesWrapper>
      {features.map((feature, idx) => (
        <FeatureCard key={idx}>
          <Icon>{feature.icon}</Icon>
          <h3>{feature.title}</h3>
          <p>{feature.desc}</p>
        </FeatureCard>
      ))}
    </FeaturesWrapper>
  );
}
