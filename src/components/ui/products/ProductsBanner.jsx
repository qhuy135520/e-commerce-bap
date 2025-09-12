import styled from "styled-components";
// Styled Components
const BannerWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #ffe5d4, #ffb8a8);
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const BannerContent = styled.div`
  flex: 1;
  padding: 20px;
  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    color: #333;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #555;
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

const BannerImage = styled.div`
  flex: 1;
  img {
    width: 100%;
    max-height: 350px;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export default function ProductBanner() {
  return (
    <BannerWrapper>
      <BannerContent>
        <h1>Mua sắm thông minh – Ưu đãi mỗi ngày</h1>
        <p>Khám phá các sản phẩm hot, giảm giá cực sốc chỉ hôm nay!</p>
        <button>Shop Ngay</button>
      </BannerContent>
      <BannerImage>
        <img
          src="https://ouoglhhwclawqhftzrif.supabase.co/storage/v1/object/public/ProductImage/banner.png"
          alt="banner ecommerce"
        />
      </BannerImage>
    </BannerWrapper>
  );
}
