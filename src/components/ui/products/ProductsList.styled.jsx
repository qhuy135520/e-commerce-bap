import { Pagination } from "antd";
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
  gap: 24px;
  margin-top: 24px;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  h2 {
    font-size: 3rem;
    font-weight: 800;
    color: #333;
    margin-bottom: 15px;
  }
  p {
    font-size: 1.5rem;
    color: #555;
  }
`;

export const Sidebar = styled.div`
  flex: 0 0 250px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 100px;
  height: fit-content;
`;

export const FilterGroup = styled.div`
  margin-bottom: 20px;
`;

export const SidebarTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
`;

export const FilterItem = styled.div`
  margin-bottom: 8px;
`;

export const Box = styled.div`
  flex: 1;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .title-text {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }

  .divider {
    flex: 1;
    height: 2px;
    background: #eee;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 20px;
`;

export const ProductItem = styled.div`
  .product-card {
    background: #fff;
    border-radius: 8px;
    overflow: visible;
    transition: all 0.28s ease;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .image-wrapper {
      width: 100%;
      height: 180px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(180deg, #fafafa 0%, #fff 100%);

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }

    .product-info {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;

      .badge {
        position: absolute;
        top: 12px;
        right: 12px;
        color: #fff;
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 4px;
        background: linear-gradient(270deg, #ff4d4f, #bae0ff, #69b1ff);
        background-size: 400% 400%;
        animation: badgeGradient 3s ease infinite;

        &.badge-stock {
          background: #faad14;
          animation: none;
        }
      }
      @keyframes badgeGradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      .brand {
        font-size: 13px;
        color: #888;
      }

      .name {
        font-size: 15px;
        font-weight: 600;
        color: #222;
      }

      .description {
        font-size: 13px;
        color: #555;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .bottom-info {
        margin-top: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;

        .price {
          font-size: 16px;
          font-weight: bold;
          color: #d4380d;
        }

        .sold-stock {
          font-size: 12px;
          color: #888;
        }
      }
    }
  }
`;

export const StyledPagination = styled(Pagination)`
  margin-top: 24px;
  text-align: center;
`;
