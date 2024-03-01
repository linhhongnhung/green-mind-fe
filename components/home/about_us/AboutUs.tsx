import Service from "./Service";

const AboutUs: React.FC = () => {
  const services = [
    {
      icon: "./icon/Vector1.svg",
      title: "Large Assortment",
      desc: "we offer many different types of products with fewer variations in each category.",
    },
    {
      icon: "./icon/Vector2.svg",
      title: "Fast & Free Shipping",
      desc: "4-day or less delivery time, free shipping and an expedited delivery option.",
    },
    {
      icon: "./icon/Vector3.svg",
      title: "24/7 Support",
      desc: "answers to any business related inquiry 24/7 and in real-time.",
    },
  ];

  return (
    <section className="pb-[165px] max-w-[1440px] mx-auto max-sm:pb-[100px]">
      <div className="mx-24 text-center max-sm:mx-6">
        <h2 className="text-base font-bold">About us</h2>
        <p className="mt-3 mb-12 text-gray md:text-tiny">
          Order now and appreciate the beauty of nature
        </p>
        <div
          className="
            grid grid-cols-3 gap-6
            max-md:grid-cols-1 max-md:gap-8"
        >
          {services.map((service, index) => {
            return (
              <Service
                key={index}
                icon={service.icon}
                title={service.title}
                desc={service.desc}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
