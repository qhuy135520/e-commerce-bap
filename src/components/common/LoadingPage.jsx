import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const CartIcon = styled.svg`
  width: 4rem;
  height: 4rem;
  color: #2563eb;
  animation: bounce 1s ease-in-out infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Dot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background: #2563eb;
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const LoadingText = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  animation: pulse 1.2s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`;

const LoadingPage = () => {
  return (
    <LoadingContainer>
      <ContentWrapper>
        <div>
          <CartIcon fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </CartIcon>
          <DotsContainer>
            <Dot />
            <Dot />
            <Dot />
          </DotsContainer>
        </div>
        <LoadingText>E-Commerce Bap...</LoadingText>
      </ContentWrapper>
    </LoadingContainer>
  );
};

export default LoadingPage;
