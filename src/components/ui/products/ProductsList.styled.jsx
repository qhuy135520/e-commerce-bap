import styled from "styled-components";

export const SwiperSlideWrap = styled.div`
  position: relative;
  padding: 16px;
  overflow: hidden;

  .swiper {
    overflow: visible;
  }

  .swiper-slide {
    overflow: visible;
  }
`;

export const Container = styled.div`
  display: flex;
  padding: 32px 0;
  gap: 24px;
`;

export const Sidebar = styled.div`
  width: 240px;
  background: #fff;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;

  position: sticky;
  top: 100px;
  align-self: flex-start;
`;

export const SidebarTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const FilterGroup = styled.div`
  margin-bottom: 16px;
`;

export const FilterItem = styled.div`
  margin-bottom: 8px;
`;

export const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .title-text {
    font-size: 24px;
    font-weight: 700;
  }

  .divider {
    width: 50px;
    height: 3px;
    background-color: #ffd700;
    border-radius: 2px;
    margin-left: 12px;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const ProductItem = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;

  .product-card {
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: 320px;
    position: relative;
    overflow: visible;

    &:hover {
      border: 1px solid #ff5722;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
      transform: translateY(-4px);
    }

    .image-wrapper {
      width: 100%;
      height: 200px;
      position: relative;
      overflow: hidden;
      background-color: #f5f5f5;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .product-info {
      padding: 8px 10px;
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .brand {
        font-size: 12px;
        color: #888;
        margin-bottom: 2px;
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        line-height: 18px;
        height: 36px;
        overflow: hidden;
        margin-bottom: 4px;
      }

      .description {
        font-size: 12px;
        color: #555;
        line-height: 16px;
        height: 32px;
        overflow: hidden;
      }

      .price {
        font-size: 16px;
        font-weight: 600;
        color: #ee4d2d;
        margin: 4px 0;
      }

      .sold-stock {
        font-size: 12px;
        color: #888;
      }

      .badge {
        position: absolute;
        top: -8px;
        left: 10px;
        padding: 2px 6px;
        font-size: 10px;
        color: #fff;
        background-color: #f53d2d;
        border-radius: 2px;
      }

      .badge-stock {
        background-color: #ffa500;
        left: auto;
        right: 10px;
      }
    }
  }
`;
