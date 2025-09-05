import styled from 'styled-components'

export const StyleImgWrapper = styled.div`
  text-align: center;
`
export const StyleImgDefault = styled.img`
  border-radius: 1rem;
`
export const StyleImgSlider = styled.div`
  width: 92%;
  margin: 0 auto;
`
export const StyleImgItem = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 6px;
  border: ${({ $active }) =>
    $active ? '2px solid #1890ff' : '2px solid transparent'};
`
