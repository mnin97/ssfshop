$(document).ready(function () {
  $(".btn-search").click(function (e) {
    e.preventDefault();
    $(".pop-search").addClass("on");
  });

  $(".pop-search .prev").click(function () {
    $(".pop-search").removeClass("on");
  });

  $(".sc-video .close").click(function (e) {
    e.preventDefault();

    $(this).toggleClass("on");
    $(".play").toggleClass("on");
  });
  $(".sc-video .play").click(function (e) {
    e.preventDefault();
    $(this).removeClass("on");
    $(".close").removeClass("on");
  });

  let lastScroll = 0;
  $(window).scroll(function () {
    curr = $(this).scrollTop();

    if (curr > $(".header").height()) {
      if (curr > lastScroll) {
        $("body").addClass("scroll-down");
      } else {
        $("body").removeClass("scroll-down");
      }
    } else {
      $("body").removeClass("scroll-down");
    }

    lastScroll = curr;
  });

  const slide1 = new Swiper(".sc-visual .swiper", {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  });
  const slide2 = new Swiper(".sc-visual2 .swiper", {
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  });

  // $(".autoplay").click(function () {
  //   if ($(this).hasClass("on")) {
  //     slide2.autoplay.start();
  //   } else {
  //     slide2.autoplay.stop();
  //   }
  //   $(this).toggleClass("on");
  // });

  const slide3 = new Swiper(".sc-product .swiper", {
    slidesPerView: 1.3,
    spaceBetween: 10,

    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
  const slide4 = new Swiper(".sc-product2 .swiper", {
    slidesPerView: 1.3,
    spaceBetween: 10,

    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
  // const slide5 = new Swiper(".sc-rank .swiper", {
  //   pagination: {
  //     el: ".swiper-pagination",
  //   },
  // });

  const slide7 = new Swiper(".sc-eventarea .swiper.visual", {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  });
  const slide8 = new Swiper(".sc-eventarea .swiper.content", {
    effect: "fade",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  });

  slide7.controller.control = slide8;
  slide8.controller.control = slide7;

  const slideArr = [slide2, slide7, slide8];
  $(".autoplay").click(function () {
    idx = $(this).data("slide");
    if ($(this).hasClass("on")) {
      slideArr[idx].autoplay.start();
    } else {
      slideArr[idx].autoplay.stop();
    }
    $(this).toggleClass("on");
  });

  fetch("./assets/data/brand.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.items;

      let html = ``;
      data.forEach((element) => {
        html += ` <li class="swiper-slide">
      <img src="${element.thumb}" >
    </li> `;
      });

      $("#brandList").html(html);
      const slide6 = new Swiper(".sc-brand-gather .swiper", {
        slidesPerView: 3,
        slidesPerGroup: 9,
        grid: {
          rows: 5,
        },

        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
      });
    });

  $(".sc-rank .cate").click(function (e) {
    e.preventDefault();

    $(".sc-rank .cate").removeClass("on");
    $(this).addClass("on");

    slide5.slideTo($(this).parent().index());
  });

  function rankList(frame, num) {
    fetch("./assets/data/category.json")
      .then((res) => res.json())
      .then((json) => {
        allData = json.items;

        sortData = allData.filter(function (parm) {
          return parm.cate.indexOf(num) >= 0;
        });

        let html = ``;
        sortData.forEach((e) => {
          html += `
          <li>
          <div class="rank">${e.rank}</div>
          <a href="">
            <div class="img-box">
              <img
                src="${e.image}"
                alt=""
              />
            </div>
            <div class="content">
              <span class="brand"> ${e.product}</span>
              
                <div class="title">
                  ${e.title}
                </div>
              
              <span class="saleprc"> 259,000</span>
              <span class="lastsaleprc">
                <em class="dc">53%</em>
                123,020
              </span>
            </div>
          </a>
        </li>
          `;
        });
        $(frame).html(html);
      });
  }

  rankList("#cateList1 ul.rank-list", 1);
  rankList("#cateList2 ul.rank-list", 2);
  rankList("#cateList3 ul.rank-list", 3);
  rankList("#cateList4 ul.rank-list", 4);

  $(".sc-choice .tag-box li").click(function (e) {
    const dataInflu = $(this).find(".tag").data("influ");
    console.log(dataInflu);
    e.preventDefault();
    $(this).find(".tag").addClass("on");
    $(this).siblings().find(".tag").removeClass("on");
    if (dataInflu === "8seconds") {
      influList("#influList1 ul.influ-list", 1);
    } else if (dataInflu === "BEANPOLE") {
      influList("#influList1 ul.influ-list", 2);
    } else if (dataInflu === "다이버픽") {
      influList("#influList1 ul.influ-list", 3);
    } else if (dataInflu === "가을신상") {
      influList("#influList1 ul.influ-list", 4);
    } else if (dataInflu === "간절기템") {
      influList("#influList1 ul.influ-list", 5);
    }
  });

  function influList(frame, num) {
    fetch("./assets/data/influ.json")
      .then((res) => res.json())
      .then((json) => {
        allData = json.items;

        sortData = allData.filter(function (parm) {
          return parm.cate.indexOf(num) >= 0;
        });
        console.log(sortData);

        let html = ``;
        sortData.forEach((e) => {
          html += `
          <li>
          <a href="">
            <div class="img-box">
             <img src="${e.thumb}"/>
            </div>
            <div class="content"><span class="id">${e.name}</span></div>
          </a>
        </li>
          `;
        });
        $(frame).html(html);
      });
  }
  influList("#influList1 ul.influ-list", 1);

  const slide5 = new Swiper(".sc-rank .swiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    on: {
      slideChange: function () {
        // 이벤트 발생 시 호출되는 함수
        // 현재 활성 슬라이드의 인덱스를 가져옵니다.
        const activeIndex = this.activeIndex;

        // 모든 cate 요소에서 on 클래스를 제거합니다.
        $(".cate").removeClass("on");

        // 해당 인덱스에 해당하는 cate 요소에 on 클래스를 추가합니다.
        $(".cate").eq(activeIndex).addClass("on");
      },
    },
  });

  // src="https://www.youtube.com/embed/amhubDb5-Ew?rel=0&amp;controls=0&autoplay=1&mute=1"

  $(".sc-video .list .video-box .img-box .video .close").click(function () {
    $(".sc-video .list .video-box .img-box .video").removeClass("hide");
    $(".youtube").attr(
      "src",
      "https://www.youtube.com/embed/amhubDb5-Ew?rel=0&amp;controls=0"
    );
  });

  $(".sc-video .list .video-box .img-box .video .play").click(function () {
    $(".sc-video .list .video-box .img-box .video").addClass("hide");
    $(".youtube").attr(
      "src",
      "https://www.youtube.com/embed/amhubDb5-Ew?rel=0&amp;controls=0&autoplay=1&mute=1"
    );
  });

  let playFlag = 0;
  $(window).scroll(function () {
    curr = $(this).scrollTop();
    target = $(".sc-video").offset().top;

    if (curr >= target) {
      if (playFlag == 0) {
        $(".sc-video .list .video-box .img-box .video").addClass("hide");
        $(".youtube").attr(
          "src",
          "https://www.youtube.com/embed/amhubDb5-Ew?rel=0&amp;controls=0&autoplay=1&mute=1"
        );

        playFlag = 1;
      }
    } else {
    }
  });
  const colors = [
    "linear-gradient(138.09deg, rgb(116, 0, 232) 24.35%, rgb(0, 169, 158) 88.21%)",
    "rgb(0, 191, 178)",
    "rgb(7, 29, 73)",
  ];

  $(".sc-visual2 .swiper-slide").each(function (index) {
    $(this).css("background", colors[index]);
  });
});
