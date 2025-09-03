import { Carousel } from 'antd';

const Slider = () => (
  <Carousel autoplay>
    <div>
      <h3
        style={{
          height: '200px',
          background: '#364d79',
          color: '#fff',
          lineHeight: '200px',
          textAlign: 'center',
        }}
      >
        Slide 1
      </h3>
    </div>
    <div>
      <h3
        style={{
          height: '200px',
          background: '#639',
          color: '#fff',
          lineHeight: '200px',
          textAlign: 'center',
        }}
      >
        Slide 2
      </h3>
    </div>
  </Carousel>
);

export default Slider;
