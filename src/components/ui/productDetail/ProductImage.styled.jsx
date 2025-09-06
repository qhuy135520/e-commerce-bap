import styled from 'styled-components'

export const ImgWrapper = styled.div`
  text-align: center;
`
export const ImgDefault = styled.img`
  border-radius: 1rem;
  width: 43.2rem;
  height: 43.2rem;
`
export const ImgSlider = styled.div`
  width: 92%;
  margin: 0 auto;
`
export const ImgItem = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 6px;
  border: ${({ $active }) =>
    $active ? '2px solid #1890ff' : '2px solid transparent'};
`
