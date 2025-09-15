import styled, { keyframes } from "styled-components";
import { FaMobileAlt, FaLaptop, FaHeadphones, FaTv } from "react-icons/fa";
import { motion } from "framer-motion";

import useCategories from "@/hooks/products/useCategories";

const categoryIcons = {
  "Điện thoại": <FaMobileAlt />,
  Laptop: <FaLaptop />,
  "Phụ kiện": <FaHeadphones />,
  "Màn hình": <FaTv />,
};

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const CategoriesWrapper = styled.section`
  max-width: 1300px;
  margin: 100px auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  background-color: #fff;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 35px;
`;

const Header = styled.div`
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

const CategoryCard = styled(motion.div)`
  background: rgba(70, 130, 180, 0.15);
  border-radius: 25px;
  padding: 50px 25px;
  text-align: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  transition: all 0.4s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 4rem;
    color: #4682b4;
    margin-bottom: 20px;
    transition: transform 0.4s ease;
  }

  span {
    font-size: 1.4rem;
    font-weight: 700;
    color: #333;
    text-align: center;
    position: relative;
    padding: 7px 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(4px);
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);

    svg {
      transform: translateY(-6px) scale(1.25);
    }
  }
`;

export default function ProductsCategories() {
  const { category } = useCategories();

  return (
    <CategoriesWrapper>
      <Header>
        <h2>Khám phá danh mục sản phẩm</h2>
        <p>Chọn danh mục bạn yêu thích để tìm sản phẩm cực nhanh</p>
      </Header>
      <CategoryGrid>
        {category &&
          category.map((cat, idx) => (
            <CategoryCard
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {categoryIcons[cat.name] || <FaHeadphones />}
              <span>{cat.name}</span>
            </CategoryCard>
          ))}
      </CategoryGrid>
    </CategoriesWrapper>
  );
}
