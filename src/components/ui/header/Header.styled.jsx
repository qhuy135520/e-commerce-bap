import { AutoComplete, Button, Input, Menu, Popover } from "antd";
import styled from "styled-components";

export const HeaderBg = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1001;
`;
export const HeaderTop = styled.div`
  background: var(--grad-blue-1);
  height: 6.4rem;
  display: flex;
  align-items: center;
`;
export const HeaderBottom = styled.div`
  display: block;
  background-color: var(--color-grey-200);
  height: 3.2rem;
  display: flex;
  align-items: center;
  @media (max-width: 431px) {
    display: none;
  }
`;
export const ContainerTop = styled.div`
  max-width: 1200px;
  padding: 0 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  gap: 2rem;

  & > * {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;
export const ContainerBot = styled.div`
  max-width: 1200px;
  padding: 0 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 2rem;
`;
export const ButtonHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
export const Img = styled.img`
  height: 100%;
  cursor: pointer;
  @media (max-width: 431px) {
    display: none;
  }
`;
export const InputSearch = styled(Input)`
  height: 4rem;
  border-radius: 2rem;
  width: 60%;
  background-color: var(--color-grey-100);

  .ant-input::placeholder {
    color: var(--color-grey-800);
    opacity: 0.5;
  }
  @media (max-width: 431px) {
    width: 19rem;
  }
`;
export const MenuHeader = styled(Menu)`
  display: flex;
  flex-direction: ${(props) => (props.mode === "horizontal" ? "row" : "column")};
  width: ${(props) => (props.mode === "horizontal" ? "68rem" : "100%")};
  justify-content: center;
  height: 100%;
  align-items: center;
  background-color: var(--color-grey-200);
  &.ant-menu-inline {
    border-inline-end: none !important;
  }
`;

export const ListCateMobileWrapper = styled(Popover)`
  display: none;

  @media (max-width: 431px) {
    display: block;

    .ant-popover-inner {
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      padding: 0.5rem;
      background-color: #fff;
      transition: all 0.3s ease;

      .ant-popover-inner-content {
        padding: 0;
      }
    }
  }
`;

export const ContentPopover = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 2rem;
  min-width: 220px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 16px;
    transition: all 0.2s ease;
    text-align: left;

    &:hover {
      background-color: rgba(30, 144, 255, 0.1);
      color: #1e90ff;
    }

    .popover-badge {
      margin-left: auto;
      background-color: #f0f0f0;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      color: #1e90ff;
    }
  }

  hr {
    width: 80%;
    border-color: #eee;
    margin: 0.5rem auto;
  }
`;

export const StyledAutoComplete = styled(AutoComplete)`
  width: 60%;
`;

export const StyleInputSearch = styled(Input)`
  height: 4rem;
  border-radius: 2rem;
  width: 60%;
  background-color: var(--color-grey-100);

  .ant-input::placeholder {
    color: var(--color-grey-800);
    opacity: 0.5;
  }
  @media (max-width: 431px) {
    width: 19rem;
  }
`;

export const LocationButton = styled(Button)`
  padding: 0 1.6rem;
  height: 4rem;
  width: 15rem;
  border: 1px solid white;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  @media (max-width: 431px) {
    width: fit-content;
  }

  & span {
    @media (max-width: 431px) {
      display: none;
    }
  }
`;
