import React, { Component } from 'react'
import Slider from "react-slick";
import "./style.css"

const dataSource = [
  {
    pic:
      "https://p1.meituan.net/gpa/5ee6d6d00d942804557c73abff79b855116489.jpg%40100w_100h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D20%26y%3D20",
    title: "Wine Collection: Best Wine This Year",
    url:
      "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?collectionId=227&source=weixinM"
  },
  {
    pic:
      "https://p0.meituan.net/gpa/387438cef7e2bb9eff5b701dde173f27268549.png%40100w_100h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D20%26y%3D20",
    title: "Amazing Tourist Destinations",
    url:
      "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?headlineId=394055&source=weixinM"
  },
  {
    pic:
      "https://p1.meituan.net/gpa/fbd325713d43366810452c38fc0e32e1945185.png%40100w_100h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D20%26y%3D20",
    title: "Would You Try These Tracks?",
    url:
      "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?headlineId=484549&source=weixinM"
  }
];

export default class Headline extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };
    return (
      <div className="headline">
        <div className="headline__logo" />
        <div className="headline__slider">
          <Slider {...settings}>
            {dataSource.map((item, index) => {
              return (<a key={index} className="headline__sliderInner"
                href={item.url}>
                <div className="headline__sliderTitle">{item.title}</div>
                <div className="headline__sliderImgWrapper">
                  <img className="headline__sliderImg" src={item.pic} alt={item.title} />
                </div>
              </a>)
            })}
          </Slider>
        </div>
      </div>
    );
  }
}
