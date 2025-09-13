import styled from "styled-components";

export const Container = styled.div`
  margin-top: 30px;
`;

export const RandomProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const ProductItem = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

    img {
      transform: scale(1.05);
    }
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
`;

export const RateWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px 10px;
  border-radius: 10px;
  .ant-rate {
    font-size: 14px;
    color: #ffd666;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .name {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.3;
  }

  .price {
    font-size: 14px;
    font-weight: bold;
    color: #ffd666;
  }

  .sold {
    font-size: 12px;
    color: #ddd;
  }
`;
