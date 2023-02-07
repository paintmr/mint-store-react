import React, { Component } from 'react'
import Slider from "react-slick";
import "./style.css"

const dataSource = [
  [
    {
      name: "Films",
      src:
        "https://www.dpfile.com/sc/eleconfig/20170223152109dp_wx_maoyan_icon.png"
    },
    {
      name: "Hotels",
      src: "https://www.dpfile.com/sc/eleconfig/20160126203337jiudian.png"
    },
    {
      name: "Leisure",
      src: "https://www.dpfile.com/sc/eleconfig/20160126202841xiuxianyule.png"
    },
    {
      name: "Takeaways",
      src: "https://www.dpfile.com/sc/eleconfig/20160126203251waimai.png"
    },
    {
      name: "Hotpots",
      src: "https://www.dpfile.com/sc/eleconfig/20160204172927huoguo.png"
    },
    {
      name: "Cuisine",
      src: "https://www.dpfile.com/sc/eleconfig/20160126194705meishi.png"
    },
    {
      name: "Beauty",
      src: "https://www.dpfile.com/sc/eleconfig/20160126202946liren.png"
    },
    {
      name: "Music",
      src: "https://www.dpfile.com/sc/eleconfig/20160126203542ktv.png"
    },
    {
      name: "Karaoke",
      src: "https://www.dpfile.com/sc/eleconfig/20160126203440zhoubianyou.png"
    },
    {
      name: "Wedding",
      src: "https://www.dpfile.com/sc/eleconfig/20160126203830jiehun.png"
    }
  ],
  [
    {
      name: "Services",
      src: "https://www.dpfile.com/sc/eleconfig/20170308125500community_new.png"
    },
    {
      name: "Tourism",
      src: "https://www.dpfile.com/sc/eleconfig/20160126205135jingguan.png"
    },
    {
      name: "Cars",
      src: "https://www.dpfile.com/sc/eleconfig/20160126203742aiche.png"
    },
    {
      name: "Sports",
      src: "https://www.dpfile.com/sc/eleconfig/20160126203617jianshen.png"
    },
    {
      name: "Shopping",
      src: "https://www.dpfile.com/sc/eleconfig/20160314121215icongouwu135.png"
    },
    {
      name: "Parenting",
      src: "https://www.dpfile.com/sc/eleconfig/20160126203905qinzi.png"
    },
    {
      name: "Home",
      src: "https://www.dpfile.com/sc/eleconfig/20160126203812daojia.png"
    },
    {
      name: "Decoration",
      src: "https://www.dpfile.com/sc/eleconfig/20161213162031zhuangxiu.png"
    },
    {
      name: "Training",
      src: "https://www.dpfile.com/gp/cms/1455525720807.png"
    },
    {
      name: "Healthcare",
      src: "https://www.dpfile.com/sc/eleconfig/20160126204327yiliao.png"
    }
  ],
  [
    {
      name: "Snacks",
      src:
        "https://www.dpfile.com/sc/eleconfig/20160204173331xiaochikuaican.png"
    },
    {
      name: "Buffets",
      src: "https://www.dpfile.com/sc/eleconfig/20160204173511zizhucan.png"
    },
    {
      name: "Jp food",
      src: "https://www.dpfile.com/sc/eleconfig/20160415121719rihanliaoli.png"
    },
    {
      name: "Hair",
      src: "https://www.dpfile.com/sc/eleconfig/20160316142804meifa.png"
    },
    {
      name: "Manicure",
      src: "https://www.dpfile.com/sc/eleconfig/20160316143047meijia.png"
    },
    {
      name: "Facial",
      src: "https://www.dpfile.com/sc/eleconfig/20160316143239meirong.png"
    },
    {
      name: "Exercise",
      src: "https://www.dpfile.com/sc/eleconfig/20160316143316shoushen.png"
    },
    {
      name: "Photography",
      src: "https://www.dpfile.com/sc/eleconfig/20160316143612qinzisheying.png"
    },
    {
      name: "Fun",
      src: "https://www.dpfile.com/sc/eleconfig/20160316143656qinziyoule.png"
    },
    {
      name: "All",
      src: "https://www.dpfile.com/sc/eleconfig/20160125182200more.png"
    }
  ]
];

export default class Category extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 5000,
      autoplaySpeed: 5000,
      cssEase: "linear"
    };
    return (
      <div className='category'>
        <Slider {...settings}>
          {dataSource.map((section, index) => {
            return <div key={index} >{section.map((item, index) => {
              return <div key={index} className="category__section">
                <img src={item.src} alt={item.name} className="category__icon" />
                <div>
                  <span className="category__text">{item.name}</span>
                </div>
              </div>
            })}</div>
          })}
        </Slider>
      </div >
    );
  }
}
