"use client";

import PartnerItem from "./partner.item";

interface ProductListProps {
  title: string;
}

const PartnerList = ({ title }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold px-5">{title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        <PartnerItem />
      </div>
    </div>
  );
};

export default PartnerList;
