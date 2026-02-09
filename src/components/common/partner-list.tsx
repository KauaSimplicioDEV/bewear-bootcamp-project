"use client";

import PartnerItem from "./partner.item";

interface ProductListProps {
  title: string;
}

const PartnerList = ({ title }: ProductListProps) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="container px-5 mx-auto lg:px-8 xl:px-12 2xl:px-16">
        <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl xl:text-4xl">{title}</h3>
      </div>
      <div className="container px-5 mx-auto lg:px-8 xl:px-12 2xl:px-16">
        <PartnerItem />
      </div>
    </div>
  );
};

export default PartnerList;
