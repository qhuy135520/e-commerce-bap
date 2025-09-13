import styled from "styled-components";
import { Rate, Radio, Select, Pagination } from "antd";

export const ReviewProduct = styled.section`
  margin: 1.4rem auto 0;
  padding: 2rem 2.4rem;
  width: 100%;
  background-color: var(--color-grey-50);
  border-radius: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const AvgWrapper = styled.div`
  flex: 0 0 220px;
  text-align: center;
`;

export const AvgScore = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: #faad14;
`;

export const AvgRate = styled(Rate)`
  font-size: 2rem;
  margin-top: 0.6rem;
`;

export const TotalReview = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-top: 0.6rem;
`;

export const BreakdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 0.6rem;
`;

export const BreakdownItem = styled.div`
  cursor: pointer;
  min-width: 240px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${({ $active }) => ($active ? "rgba(250,173,20,0.08)" : "transparent")};
  font-size: 1.6rem;

  &:hover {
    background: rgba(250, 173, 20, 0.12);
  }
`;

export const BreakdownStar = styled.div`
  width: 70px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 600;
  font-size: 1.6rem;
`;

export const BreakdownBar = styled.div`
  flex: 1;
`;

export const ProgressBar = styled.div`
  height: 10px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  background: #faad14;
`;

export const BreakdownText = styled.div`
  font-size: 1.3rem;
  color: var(--color-grey-600);
  margin-top: 0.4rem;
`;

export const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;
`;

export const FilterGroup = styled(Radio.Group)`
  margin-left: 0.6rem;
  font-size: 1.6rem;
`;

export const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;
`;

export const SortSelect = styled(Select)`
  width: 160px;
  font-size: 1.6rem;
`;

export const ReviewWrapper = styled.div`
  padding: 1rem 0;
`;

export const ReviewItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.4rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid var(--color-grey-200);
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const TitleReview = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-bottom: 0.8rem;
`;

export const ContentReview = styled.div`
  font-size: 1.6rem;
  line-height: 1.7;
  color: var(--color-grey-800);
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.6rem;
`;

export const StyledPagination = styled(Pagination)`
  font-size: 1.6rem;
`;
