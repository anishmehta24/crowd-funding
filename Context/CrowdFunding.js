import React, {useState} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { CrowdFundingAbi,CrowdFundingAddress } from "./contants";

const fetchContract  = (signerOrProvider) => 
    new ethers.Contract(CrowdFundingAddress, CrowdFundingAbi, signerOrProvider);
export const CrowdFundingContext = React.createContext();
export const CrowdFundingProvider = ({children}) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) => {
        const {title, description, amount, deadline} = campaign;
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        console.log(currentAccount)
        try{
            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount,18),
                new Date(deadline).getTime()
            );
            await transaction.wait();
            console.log("Contract call successfully executed",transaction);
        } catch (error){
            console.log("Contract call failure",error);
        }
    }

    const getCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaigns();

        const parsedCamapiagns = campaigns.map((campaign,i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            pId:i,
        }));
        return parsedCamapiagns;
    }
}