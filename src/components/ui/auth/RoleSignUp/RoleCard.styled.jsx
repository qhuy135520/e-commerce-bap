import styled from 'styled-components'
import { Button, Card, Divider, Flex, Space, Typography } from 'antd'

export const CardContainer = styled(Card)`
  border-radius: 16px;
  padding: 24px;
  background-color: var(--color-grey-0);
  border: 2px solid ${({ $bordercolor }) => $bordercolor};
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  cursor: default;
`

export const IconWrapper = styled.div`
  padding: 12px;
  border-radius: 12px;
  background-color: ${({ $color }) => `${$color}10`};
  border: 1px solid ${({ $color }) => `${$color}20`};
`

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-grey-500);
  font-size: 13px;
`

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`

export const TitleRole = styled(Typography.Title)`
  color: var(--color-grey-800) !important;
  margin: 0;
`

export const TextDescription = styled(Typography.Text)`
  color: var(--color-grey-800);
  font-size: '14px';
`
export const DividerRole = styled(Divider)`
  margin: '12px 0';
  @media (max-width: 992px) {
    margin: 10px 0;
  }
`

export const SpaceRole = styled(Space)`
  width: 100%;
  @media (max-width: 992px) {
    margin: 10px 0;
  }
`
export const ButtonRole = styled(Button)`
  color: var(--color-grey-0);
  margin-top: 16px;
  background-color: ${(props) => props.$color};
  border-color: ${(props) => props.$color};
  border-radius: 8;
  font-weight: 500;

  @media (max-width: 992px) {
    font-size: 1.4rem;
  }
`

export const FlexCard = styled(Flex)`
  padding: 10px;
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 10px;
    align-items: center;
    text-align: center;
  }
`
