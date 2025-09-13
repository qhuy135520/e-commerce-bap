// src/components/ui/searchMapVendor/VendorList.styled.js
import styled from "styled-components";

export const vendorListStyled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 18px;
    padding: 8px;

    .vendor-card {
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.25s cubic-bezier(0.2, 0.9, 0.3, 1);
      box-shadow: 0 6px 18px rgba(17, 24, 39, 0.06);
      cursor: pointer;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 30px rgba(2, 6, 23, 0.12);
      }

      &.selected {
        transform: translateY(-8px);
        box-shadow: 0 18px 45px rgba(2, 6, 23, 0.14);
      }

      .ant-card-cover {
        border-bottom: 1px solid #eef2f7;
      }

      .vendor-img-wrapper {
        height: 160px;
        overflow: hidden;
        background: linear-gradient(180deg, #f8fafc, #ffffff);
        display: flex;
        align-items: center;
        justify-content: center;

        .vendor-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.45s ease;
        }
      }
    }
  `,

  VendorInfo: styled.div`
    .vendor-name {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 6px;
      color: #0f172a;
    }

    .vendor-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;

      .star-icon {
        color: #f59e0b;
      }
    }

    .vendor-location {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      color: #475569;
      margin-bottom: 8px;

      .location-icon {
        color: #ef4444;
        font-size: 18px;
        margin-top: 2px;
      }
    }
  `,
};
