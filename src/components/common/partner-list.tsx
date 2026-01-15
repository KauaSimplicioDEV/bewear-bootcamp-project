"use client";

import PartnerItem from "./partner.item";

interface ProductListProps {
  title: string;
}

const PartnerList = ({ title }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <div className="container mx-auto px-5">
        <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
      </div>
      <div className="container mx-auto px-5">
        <PartnerItem />
      </div>
    </div>
  );
};

export default PartnerList;
