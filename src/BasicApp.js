import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
//import detectEthereumProvider from "@metamask/detect-provider";
//import { loadContract } from "./utils/load-contract";

function App() {
//My learning code
//This code is for basic understanding of metamask 
// useEffect(()=>{
//   const loadProvider=async()=>{
//     console.log(window.web3);
//     console.log(window.ethereum);
//   }
// loadProvider();
// },[]);

const [web3Api,setWeb3Api]=useState({   //this part is must in every dapp
  provider:null,
  web3:null
})
//jis bhi account se connect hai uske liye use state bna rha hu eak
const[account,setAccount]=useState(null)

useEffect(()=>{
  const loadProvider2=async()=>{
    let provider=null;
    if(window.ethereum){
      provider=window.ethereum;
      try{
        //this is for metamask popup when user enter in site
        await provider.enable();
      }
      catch{
        console.log("user not allowed");
      }
    }
  else if(window.web3){
    provider=window.web3.currentProvider;
  }
  else if(!process.env.production){
    provider=new Web3.providers.HttpProvider("Http://localhost:7545");
  }
  setWeb3Api({
    web3:new Web3(provider),
    provider
  })
  };
loadProvider2();
},[]);

useEffect(()=>{
  const getAccounts=async()=>{
    const accounts=await web3Api.web3.eth.getAccounts();
    setAccount(accounts[0]);
  }
  web3Api.web3 && getAccounts() //jab web3api aa jaye uske bad he getAccount chle
},[web3Api.web3])//jab bhi hamri web3 api me change ho jab account set kre
//console.log(web3Api.web3,"fetch api");

  return (
    <>
      <div class="card text-center">
        {/* <div class="card-header">Funding</div> */}
        <div class="card-body">
          {/* <h5 class="card-title">Balance: {balance} ETH </h5> */}
          <p class="card-text">
            Account : {account?account:"not connected"}
          </p>
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
        <div class="card-footer text-muted"></div>
      </div>
    </>
  );
}

export default App;
//npm install --save react-scripts@4.0.3
//web3 api must if we dont have web3 api we does not do any thing.