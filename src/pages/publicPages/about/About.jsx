import AboutImg from '../../../assets/about-img.jpg'
import AboutImg2 from '../../../assets/about-img-2.png'

import { StyleAbout, StyleHeading, StyleImg } from './About.styled'
export default function About() {
  return (
    <StyleAbout>
      <StyleHeading as='h2'>Giới thiệu về hệ thống E-BAP</StyleHeading>
      <StyleImg src={AboutImg} alt='About Image' />
      <p>
        Hệ thống E-BAP khai trương siêu thị đầu tiên tại tòa nhà SHB 11 Lý
        Thường Kiệt, Huế. Đến nay, hệ thống đã mở rộng ra với 2965 siêu thị toạ
        lạc tại 63 tỉnh thành lớn cùng hơn 10.000 nhân viên.
      </p>
      <hr  />
      <StyleHeading as='h2'>Hàng hóa vô cùng phong phú, đa dạng</StyleHeading>
      <img src={AboutImg2} alt='About Image' />

      <p>
        Hàng hoá tại Siêu thị Điện máy XANH vô cùng đa dạng, từ các nhóm hàng
        lớn như Tivi, Tủ Lạnh, Máy Giặt, Máy Lạnh… đến các nhóm hàng Gia dụng
        như: Nồi Cơm Điện, Bếp Ga, Bếp Điện Từ… Điện máy XANH cũng kinh doanh
        các mặt hàng như: Điện Thoại, Máy Tính Bảng, Laptop, Phụ Kiện…
      </p>
    </StyleAbout>
  )
}
