"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useDataContext } from "@/context/DataContext";
import { MdOutlineSettings } from "react-icons/md";
import { FaFaceSmileWink } from "react-icons/fa6";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  RewardsSection,
  BalanceScore,
  LeaderBoardCard,
  SettingsCard,
  ExchangeComponent,
  ExploreBody,
  SelectedPost,
  CreatePollBody,
  HistoryBody,
} from "./_components/sidebar-body-components";
import {
  RewardHeader,
  ExploreHeader,
  SelectedPostHeader,
  CreatePollHeader,
  SettingsHeader,
  ExchangeHeader,
  AssetsHeader,
  LeaderboardHeader,
  HistoryHeader,
} from "./_components/sidebar-header-components";
import toast from "react-hot-toast";

interface PoolData {
  id: any;
  name: string;
  description: string;
  category: string;
  total_amount: any;
  total_bets: any;
  finalScore: any;
  startTime: any;
  endTime: any;
  resultDeclareTime: any;
  poolEnded: boolean;
}

const sidebarItems = [
  "Explore",
  "Create",
  "History",
  "Assets",
  "Leaderboard",
  "Rewards",
  "Exchange",
];

const LaunchPage: React.FC = () => {
  const { address, chain } = useAccount();
  const {
    totalPools,
    tokenBalance,
    userBetsData,
    placeBet,
    mintNft,
    nftMintedAllReady,
    convertUSDetoBuzz,
    convertBuzztoUSDe,
  } = useDataContext();

 
  const [isBetted, setIsBetted] = useState(false);
  const [investment, setInvestment] = useState(0);
  const [scorePrediction, setScorePrediction] = useState(0);
  const [selected, setSelected] = useState("Explore");
  const [selectedPost, setSelectedPost] = useState<PoolData | null>(null);

  const [fromToken, setFromToken] = useState({
    symbol: "USDe",
    amount: tokenBalance.usdeBalance,
  });
  const [toToken, setToToken] = useState({
    symbol: "BUZZ",
    amount: tokenBalance.buzzBalance,
  });
  const [maxTokenBalances, setMaxTokenBalances] = useState({
    fromBalance: tokenBalance.usdeBalance,
    toBalance: tokenBalance.buzzBalance,
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [actionButtonText, setActionButtonText] = useState("Exchange");
  const [isTransacting, setIsTransacting] = useState(false);

  const handleSubmit = async () => {
    console.log(selectedPost?.id, scorePrediction, investment);
    await placeBet(+selectedPost?.id, +investment.toString(), scorePrediction);
  };

  const handleSwap = () => {
    setFromToken((prev) => ({
      symbol: prev.symbol === "USDe" ? "BUZZ" : "USDe",
      amount: 0,
    }));
    setToToken((prev) => ({
      symbol: prev.symbol === "BUZZ" ? "USDe" : "BUZZ",
      amount: 0,
    }));

    if (fromToken.symbol === "USDe") {
      setMaxTokenBalances({
        fromBalance: tokenBalance.buzzBalance,
        toBalance: tokenBalance.usdeBalance,
      });
    } else {
      setMaxTokenBalances({
        fromBalance: tokenBalance.usdeBalance,
        toBalance: tokenBalance.buzzBalance,
      });
    }
  };

  const handleAction = useCallback(async () => {
    if (!address || !fromToken.amount) {
      toast.error("Missing required information");
      return;
    }
    setIsTransacting(true);
    if (fromToken.symbol === "USDe") {
      console.log("converting USDe to Buzz");
      await convertUSDetoBuzz(fromToken.amount);
      setIsTransacting(false);
      setIsCalculating(false);
    } else {
      console.log("converting Buzz to USDe");
      await convertBuzztoUSDe(fromToken.amount);
      setIsTransacting(false);
      setIsCalculating(false);
    }
  }, [address, fromToken.amount]);

  const handleFromAmountChange = (e: any) => {
    setIsCalculating(true);
    if (fromToken.symbol === "USDe") {
      setFromToken((prev) => ({ ...prev, amount: +e.target.value }));
      setToToken((prev) => ({
        ...prev,
        amount: +e.target.value * 10,
      }));
      setIsCalculating(false);
    } else {
      setFromToken((prev) => ({ ...prev, amount: +e.target.value }));
      setToToken((prev) => ({
        ...prev,
        amount: +e.target.value / 10,
      }));
      setIsCalculating(false);
    }
  };

  const mintYourNft = async () => {
    await mintNft();
  };



  const handleMax = () => {
    setInvestment(tokenBalance?.buzzBalance);
  };

  useEffect(() => {
    const val =
      userBetsData?.length > 0 &&
      userBetsData?.find((item) => item?.poolId == selectedPost?.id);
    if (val) {
      setIsBetted(true);
    } else {
      setIsBetted(false);
    }
  }, [userBetsData]);

  return (
    <div className="flex items-center justify-center h-[100vh] bg-change-primary-bg orbitron-launch">
      <div className="w-[85%] h-[90%] shadow-lg rounded-lg flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-change-secondary-bg shadow-lg p-4 flex flex-col">
          <h1 className="text-2xl font-bold text-white"> 🪰 Bu<b className="text-blue-500">$$</b>ing </h1>
          {address && (
            <nav className="flex flex-col mt-6 space-y-3">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item}
                  label={item}
                  active={selected === item}
                  onClick={() => {
                    setSelected(item);
                    setSelectedPost(null);
                  }}
                />
              ))}
            </nav>
          )}
          {/* User Profile */}

          <div className="mt-4 absolute bottom-[20%]">
            <ConnectButton chainStatus={false} showBalance={false} />
          </div>
          <div className="mt-auto flex items-center p-3 border-t">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-md">
              <FaFaceSmileWink size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-white">
                {address
                  ? `${address.slice(0, 8)}...${address.slice(-5)}`
                  : "Guest"}
              </p>
              <p className="text-xs text-gray-500">
                {chain?.name || "Ethereum"}
              </p>
            </div>
            <div className="ml-3">
              <button onClick={() => setSelected("Settings")}>
                <MdOutlineSettings size={25} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex items-center bg-change-secondary-bg  opacity-90 shadow-lg px-4 py-3 justify-center">
            {selected === "Explore" && !selectedPost && address && (
              <>
                <ExploreHeader />
              </>
            )}
            {selected === "Explore" && selectedPost && address && (
              <>
                <SelectedPostHeader
                  selectedPost={selectedPost}
                  setSelectedPost={setSelectedPost}
                />
              </>
            )}
            {selected === "History" && address && (
              <>
                <HistoryHeader />
              </>
            )}
            {selected === "Create" && address && (
              <>
                <CreatePollHeader />
              </>
            )}
            {selected === "Settings" && address && (
              <>
                <SettingsHeader />
              </>
            )}
            {selected === "Exchange" && address && (
              <>
                <ExchangeHeader />
              </>
            )}
            {selected === "Assets" && address && (
              <>
                <AssetsHeader />
              </>
            )}
            {selected === "Leaderboard" && address && (
              <>
                <LeaderboardHeader />
              </>
            )}{" "}
            {selected === "Rewards" && address && (
              <>
                <RewardHeader />
              </>
            )}
          </header>

          {/* Content Section */}
          <div className="p-6 bg-change-secondary-bg shadow-lg h-full overflow-y-scroll scrollbar-thin">
            {selected === "Explore" && !selectedPost && address && (
              <>
                <ExploreBody
                  transformedPoolsData={totalPools}
                  setSelectedPost={setSelectedPost}
                />
              </>
            )}
            {selected === "Settings" && address && <SettingsCard />}
            {selectedPost && address && (
              <>
                <SelectedPost
                  selectedPost={selectedPost}
                  isBetted={isBetted}
                  investment={investment}
                  setInvestment={setInvestment}
                  scorePrediction={scorePrediction}
                  setScorePrediction={setScorePrediction}
                  handleSubmit={handleSubmit}
                  handleMax={handleMax}
                />
              </>
            )}
            {selected === "Rewards" && address && (
              <RewardsSection
                onClick={mintYourNft}
                nftMintedAllReady={nftMintedAllReady}
              />
            )}

            {selected === "Assets" && address && (
              <>
                <div className="flex justify-center items-center flex-col">
                  <BalanceScore
                    setSelected={setSelected}
                    setSelectedPost={setSelectedPost}
                  />
                </div>
              </>
            )}
            {selected === "Exchange" && address && (
              <>
                <ExchangeComponent
                  fromToken={fromToken}
                  toToken={toToken}
                  isCalculating={isCalculating}
                  actionButtonText={actionButtonText}
                  isTransacting={isTransacting}
                  handleFromAmountChange={handleFromAmountChange}
                  handleSwap={handleSwap}
                  handleAction={handleAction}
                  maxTokenBalances={maxTokenBalances}
                />
              </>
            )}
            {selected === "Leaderboard" && address && <LeaderBoardCard />}
            {selected === "Create" && address && <CreatePollBody />}

            {selected === "History" && address && (
              <>
                <HistoryBody />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center p-2 rounded-lg ${active ? "bg-gray-200 text-black" : "hover:bg-gray-200 hover:text-black"}`}
  >
    <span className="ml-3 font-semibold">➡ {label}</span>
  </button>
);

export default LaunchPage;
