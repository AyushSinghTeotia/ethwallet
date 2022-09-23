import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";

function App() {
//My learning code

useEffect(()=>{
  const loadProvider=async()=>{
    console.log(window.web3);
    console.log(window.ethereum);
  }
loadProvider();
},[]);

  return (
    <>
      <div class="card text-center">
        {/* <div class="card-header">Funding</div> */}
        <div class="card-body">
          {/* <h5 class="card-title">Balance: {balance} ETH </h5> */}
          {/* <p class="card-text">
            Account : {account ? account : "not connected"}
          </p> */}
          <button
            type="button"
            class="btn btn-success" onClick={ async()=>{
             //jis account se connect vo account get krna ho to
             const accounts= await window.ethereum.request({method:"eth_requestAccounts",});
             console.log(accounts);
             document.write(`Connected Account ${accounts}`);
            }
            

            }>
            Connect to metamask
          </button>
          
          {/* &nbsp;
          <button type="button" class="btn btn-success " onClick={transferFund}>
            Transfer
          </button>
          &nbsp; */}
          {/* <button type="button" class="btn btn-primary " onClick={withdrawFund}>
            Withdraw
          </button> */}
        </div>
        <div class="card-footer text-muted">Code Eater</div>
      </div>
    </>
  );
}

export default App;
//npm install --save react-scripts@4.0.3