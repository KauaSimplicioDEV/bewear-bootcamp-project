import { SiNike } from "react-icons/si";
import { SiAdidas } from "react-icons/si";
import { SiPuma } from "react-icons/si";
import { SiNewbalance } from "react-icons/si";
import { SiReebok } from "react-icons/si";
import { SiThenorthface } from "react-icons/si";
import { SiFila } from "react-icons/si";

const cardPartner = [
  {
    icon: <SiNike className="text-3xl" />,
    title: "Nike",
  },
  {
    icon: <SiAdidas className="text-3xl" />,
    title: "Adidas",
  },
  {
    icon: <SiPuma className="text-3xl" />,
    title: "Puma",
  },
  {
    icon: <SiNewbalance className="text-3xl" />,
    title: "NewBalance",
  },
  {
    icon: <SiReebok className="text-3xl" />,
    title: "Reebok",
  },
  {
    icon: <SiThenorthface className="text-3xl" />,
    title: "TNF",
  },
  {
    icon: <SiFila className="text-3xl" />,
    title: "Fila",
  },
];

const PartnerItem = () => {
  return (
    <div className="w-full">
      <div className="flex overflow-x-auto gap-4 md:gap-6 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-x-visible md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {cardPartner.map((card, index) => (
          <div key={index} className="flex-shrink-0 md:flex-shrink">
            <div className="p-6 gap-2 flex justify-center items-center border rounded-3xl">
              {card.icon}
            </div>
            <div className="flex truncate justify-center mt-3 font-semibold text-sm">
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerItem;
