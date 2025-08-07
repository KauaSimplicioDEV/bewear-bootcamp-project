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
    <div>
      <div className="flex overflow-x-scroll gap-6 w-full">
        {cardPartner.map((card, index) => (
          <div key={index} className="">
            <div className="px-6 py-5 gap-2 flex justify-center items-center border rounded-3xl">
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
