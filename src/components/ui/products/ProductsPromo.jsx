import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const promos = [
  {
    title: "Flash Sale 50%",
    desc: "Chỉ hôm nay!",
    img: "https://cdn2.fptshop.com.vn/unsafe/480x0/filters:format(webp):quality(75)/adapt_FPT_FPT_405x175_9990149fad.jpg",
  },
  {
    title: "Voucher 100k",
    desc: "Đơn trên 500k",
    img: "https://static.vivnpay.vn/202212121105/thumb-website-Vi-VNPAY-1280x720.jpg",
  },
  {
    title: "Mua 1 tặng 1",
    desc: "Số lượng có hạn",
    img: "https://cdn2.fptshop.com.vn/unsafe/480x0/filters:format(webp):quality(75)/H3_405x175_b50d84b845.png",
  },
  {
    title: "Deal HOT hôm nay",
    desc: "Giảm đến 70%",
    img: "https://cdn2.fptshop.com.vn/unsafe/480x0/filters:format(webp):quality(75)/H3_405x175_bec27baf1c.png",
  },
  {
    title: "Voucher 50k",
    desc: "Cho đơn 300k",
    img: "https://cdn2.fptshop.com.vn/unsafe/480x0/filters:format(webp):quality(75)/H3_405x175_2697e0611b.png",
  },
  {
    title: "Giảm giá sốc",
    desc: "Combo hấp dẫn",
    img: "https://cdn2.fptshop.com.vn/unsafe/828x0/filters:format(webp):quality(75)/H3_405x175_a3aa2dce77.png",
  },
  {
    title: "Freeship đơn 500k",
    desc: "Nhanh tay mua ngay",
    img: "https://cdn2.fptshop.com.vn/unsafe/828x0/filters:format(webp):quality(75)/H3_405x175_a492bb8915.png",
  },
];

const gradients = [
  "linear-gradient(135deg, #FF6F3C, #FFD700)",
  "linear-gradient(135deg, #56CCF2, #2F80ED)",
  "linear-gradient(135deg, #6FCF97, #27AE60)",
  "linear-gradient(135deg, #9B51E0, #BB6BD9)",
  "linear-gradient(135deg, #F2994A, #F2C94C)",
  "linear-gradient(135deg, #EB5757, #FF6B6B)",
  "linear-gradient(135deg, #2D9CDB, #56CCF2)",
];

const SliderWrapper = styled.div`
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

const PromoCard = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
  }
`;

const PromoImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
`;

const PromoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${(props) => props.$gradient};
  mix-blend-mode: overlay;
  opacity: 0.5;
`;

const PromoContent = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;

  h3,
  p {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    margin: 5px 0;
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
  }

  button {
    margin-top: 8px;
    padding: 8px 20px;
    font-size: 1.2rem;
    font-weight: 600;
    background: linear-gradient(135deg, #ff6f3c, #ffd700);
    color: #fff;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    }
  }
`;

export default function ProductsPromo() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <SliderWrapper>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3.2}
          spaceBetween={20}
          loop={true}
          freeMode={true}
          speed={4000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          grabCursor={true}
        >
          {promos.map((promo, idx) => (
            <SwiperSlide key={idx}>
              <PromoCard>
                <PromoImage src={promo.img} alt={promo.title} />
                <PromoOverlay $gradient={gradients[idx % gradients.length]} />
                <PromoContent>
                  <h3>{promo.title}</h3>
                  <p>{promo.desc}</p>
                  <button>
                    <FaShoppingCart /> Mua ngay
                  </button>
                </PromoContent>
              </PromoCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderWrapper>
    </motion.div>
  );
}
