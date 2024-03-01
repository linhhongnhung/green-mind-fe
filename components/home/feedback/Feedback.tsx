"use client";
import FeedbackItem from "./FeedbackItem";
import Slider from "react-slick";
import Slide from "@/components/animations/Slide";

const Feedback: React.FC = () => {
  const feedbacks = [
    {
      name: "John Doe",
      profession: "Youtuber",
      img: "./img/customer1.svg",
      rating: 4.5,
      comment:
        "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      name: "John Doe",
      profession: "Artist",
      img: "./img/customer2.svg",
      rating: 5,
      comment:
        "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      name: "John Doe",
      profession: "Youtuber",
      img: "./img/customer1.svg",
      rating: 4.5,
      comment:
        "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
  ];
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section
      className="
        max-w-[1440px] mx-auto pt-24 pl-24 pb-[230px]
        max-xl:px-12 max-sm:px-6"
    >
      <div className="max-w-[1248px] flex justify-between mb-12">
        <Slide key={0} index={0} direction="right">
          <h2 className="max-w-[457px] text-base font-bold max-sm:text-tiny">
            What customers say about GREENMIND?
          </h2>
        </Slide>
        <img className="max-sm:w-10" src="./img/Group17.svg" alt="slide" />
      </div>
      <div className="max-w-[1344px] mx-auto">
        <Slider {...settings}>
          {feedbacks.map((feedback, index) => {
            return (
              <FeedbackItem
                key={index}
                name={feedback.name}
                profession={feedback.profession}
                img={feedback.img}
                rating={feedback.rating}
                comment={feedback.comment}
              />
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Feedback;
