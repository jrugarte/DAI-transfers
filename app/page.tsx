"use client";
import daiContractABI from "@/abi/dai-abi.json";
import TransfersTable from "@/components/TransfersTable";
import { Transfer } from "@/types/types";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const infuraUrl = `https://mainnet.infura.io/v3/${infuraApiKey}`;
const contractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

export default function Home() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const transformEventToTransferItem = async (
    event: ethers.Event
  ): Promise<Transfer> => {
    const tx = await event.getTransaction();
    const block = await event.getBlock();

    const transferItem = {
      from: tx.from,
      to: tx.to ?? "-",
      timestamp: block.timestamp * 1000,
      amount: parseFloat(
        ethers.utils.formatUnits(event?.args?.value, 18)
      ).toFixed(2),
      transactionHash: event.transactionHash,
    };

    return transferItem;
  };

  const listenToEvent = async (provider: ethers.providers.JsonRpcProvider) => {
    const contract = new ethers.Contract(
      contractAddress,
      daiContractABI,
      provider
    );

    // get latest 100
    // const transferFilter = contract.filters.Transfer();
    // const transferEvents = await contract.queryFilter(transferFilter, -1);
    // const results = await Promise.all(
    //   transferEvents.map((item) => transformEventToTransferItem(item))
    // );

    // setTransfers((prevData) => [...results, ...prevData]);

    contract.on("Transfer", async (from, to, wax, event) => {
      const transferItem = await transformEventToTransferItem(event);

      setTransfers((prevData) => [transferItem, ...prevData]);
    });
  };

  const connect = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

      listenToEvent(provider);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <div className="flex flex-col justify-center px-1 align-middle border-white">
      <div className="flex flex-col items-center border-white">
        <h1 className="text-2xl font-bold p-2 m-2 mb-6">$DAI.ly Transfers</h1>

        <div className="px-4 overflow-x-auto max-w-full">
          <TransfersTable transfers={transfers} />
        </div>
      </div>
    </div>
  );
}
