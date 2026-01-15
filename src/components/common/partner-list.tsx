"use client";

import PartnerItem from "./partner.item";

interface ProductListProps {
  title: string;
}

const PartnerList = ({ title }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <div className="container px-5 mx-auto">
        <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>
      </div>
      <div className="container px-5 mx-auto">
        <PartnerItem />
      </div>
    </div>
  );
};

export default PartnerList;
