import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const endow = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const reclaim = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount} className="royal-button bigger">
          Interface with your Metamask wallet block, if you please 🦊
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <div className="button-container">
          <button onClick={endow} className="royal-button bigger">
            Endow 1 ETH 🪙
          </button>
          <button onClick={reclaim} className="royal-button bigger">
            Reclaim 1 ETH 💵
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>LET'S ROLL SOME ETHEREUM</h1>
      </header>
      {initUser()}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap");

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: repeating-linear-gradient(
            45deg,
            #FF8C00,
            #FF8C00 1in,
            #111111 1in,
            #111111 2in
          );
          color: white;
          font-family: "MedievalSharp", cursive;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          padding: 20px;
          position: relative;
        }

        h1 {
          font-size: 4em; /* Increase font size */
          margin-bottom: 20px;
          border-bottom: 2px solid white;
          padding-bottom: 10px;
          background: url("https://www.transparenttextures.com/patterns/black-linen.png");
          -webkit-background-clip: text;
          color: white; /* Change text color to white */
          font-weight: bold; /* Make text bold */
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        p {
          font-size: 1.5em;
          background: url("https://www.transparenttextures.com/patterns/black-linen.png");
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 20px; /* Adjust the space between buttons */
          margin-top: 20px; /* Add margin to separate from account info */
        }

        .royal-button {
          font-size: 3em; /* Increase button font size */
          font-family: "MedievalSharp", cursive;
          border: 2px solid gold; /* Border color */
          background-color: transparent;
          color: gold; /* Text color */
          padding: 30px 60px; /* Increase padding */
          cursor: pointer;
          transition: all 0.3s ease;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          position: relative;
          overflow: hidden;
          animation: none;
        }

        .royal-button:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300%;
          height: 300%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          border-radius: 50%;
          z-index: 0;
          transform: translate(-50%, -50%) scale(0);
        }

        .royal-button:hover:before {
          transform: translate(-50%, -50%) scale(1);
        }

        .royal-button span {
          position: relative;
          z-index: 1;
        }

        .royal-button:hover {
          color: #111111;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .royal-button:active {
          transform: scale(0.98);
          animation: bounce 0.5s;
        }

        @keyframes bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        /* Coin-like background pattern */
        .container::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: url("https://www.transparenttextures.com/patterns/dark-denim-3.png");
          opacity: 0.1;
          z-index: -1;
        }
      `}</style>
    </main>
  );
}
