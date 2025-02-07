import { useDataContext } from "@/context/DataContext";
import React from "react";

import { RiRadioButtonLine } from "react-icons/ri";
interface Post {
  id: number;
  url: string;
  question: string;
  category: string;
  parameter: string;
  poll_type: number;
  total_amount: number;
  total_bets: number;
  finalScore: number;
  startTime: number;
  endTime: number;
  resultDeclareTime: number;
  poolEnded: boolean;
}
const PostComponent = ({
  item,
  onSelect,
}: {
  item: Post;
  onSelect: () => void;
}) => {
  const { formatTimestamp } = useDataContext();
  return (
    <>
      <div
        onClick={onSelect}
        className="bg-change-primary-bg  rounded-md shadow-md p-4 cursor-pointer flex flex-col gap-4"
      >
        <h2 className="font-bold text-md text-white">{item?.question}</h2>
        <p className="text-xs text-gray-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
          ex!
        </p>

        <div className="text-blue-500 text-xs font-semibold space-x-2 uppercase">
          <span># {item?.category}</span>
          <span># {item?.parameter}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-200">
          <div className="flex items-center gap-2">
            <img
              src="https://pbs.twimg.com/profile_images/1884937424364851200/VSrPwZa4_400x400.jpg"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span className="font-semibold">{item?.url}</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span>💰 ${item?.total_amount}</span>
            <span>⏱️ {formatTimestamp(item?.startTime)}</span>
            <span>👥 {item?.total_bets}</span>
            <span className="flex items-center gap-1">
              {item?.poolEnded ? (
                <>
                  <RiRadioButtonLine className="text-red" />
                  <span>ENDED</span>
                </>
              ) : (
                <>
                  <RiRadioButtonLine className="text-green-500" />
                  <span>ONGOING</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostComponent;
