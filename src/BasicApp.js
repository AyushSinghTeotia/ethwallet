import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
//import contract from "@truffle/contract";

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
  web3:null,
  //now we learn contract integration 
  contract:null
})
//jis bhi account se connect hai uske liye use state bna rha hu eak
const[account,setAccount]=useState(null)
const[balance,setBalance]=useState(null) //for state balance
const [reload,shouldReload]= useState(false); //Relode
const reloadEffect =()=>shouldReload(!reload);

//this code takes lot of if esle it is not efficient so avoid this we have to use @metamask/detect-provider
// useEffect(()=>{
//   const loadProvider2=async()=>{
//     let provider=null;
//     if(window.ethereum){
//       provider=window.ethereum;
//       try{
//         //this is for metamask popup when user enter in site
//         await provider.enable();
//       }
//       catch{
//         console.log("user not allowed");
//       }
//     }
//   else if(window.web3){
//     provider=window.web3.currentProvider;
//   }
//   else if(!process.env.production){
//     provider=new Web3.providers.HttpProvider("Http://localhost:7545");
//   }
//   setWeb3Api({
//     web3:new Web3(provider),
//     provider
//   })
//   };
// loadProvider2();
// },[]);

//now in short way we can find metamak is install or not in our browser so we can use @metamask/detect-provider
useEffect(()=>{
  const loadProvider3=async()=>{
    const provider=await detectEthereumProvider();
    const contract=await loadContract("Funder",provider);
    if(provider){
      provider.request({method:"eth_requestAccounts"}); //for provider and pop up of metamask
      //When we got provider then 
      setWeb3Api({
        web3:new Web3(provider),
        provider,
        contract
      })
    }
    else{
      console.error("Please install metamask");
    }
 
  };
loadProvider3();
},[]);
//for check balance of contract
useEffect(()=>{
  const loadBalance = async()=>{
  const {contract,web3}=web3Api;
  const balance = await web3.eth.getBalance(contract.address);
  setBalance(web3.utils.fromWei(balance,"ether"));
  }
  web3Api.contract && loadBalance();
},[web3Api,reload])

useEffect(()=>{
  const getAccounts=async()=>{
    const accounts=await web3Api.web3.eth.getAccounts();
    setAccount(accounts[0]);
  }
  web3Api.web3 && getAccounts() //jab web3api aa jaye uske bad he getAccount chle
},[web3Api.web3])//jab bhi hamri web3 api me change ho jab account set kre
//console.log(web3Api.web3,"fetch api");

//for transfer funnd in smart contract
  const transferFund = async () => {
  const { web3, contract } = web3Api;
  await contract.transfer({
  from: account,
  value: web3.utils.toWei("2", "ether"),
  });
  reloadEffect();
  };
  const withdrawFund=async()=>{
    const {contract,web3}=web3Api;
    const WithdrawAmount=web3.utils.toWei("2","ether");
    await contract.withdraw(WithdrawAmount,{
      from:account})
      reloadEffect();
  }
 
  return (
    <>
      <div class="card text-center">
        {/* <div class="card-header">Funding</div> */}
        <div class="card-body">
          <h5 class="card-title">Balance: {balance} ETH </h5>
          <p class="card-text">
              Account : {account?account:"not connected"}
          </p>
          {/* <button
            type="button"
            class="btn btn-success" onClick={ async()=>{
             //jis account se connect vo account get krna ho to
             const accounts= await window.ethereum.request({method:"eth_requestAccounts",});
             console.log(accounts);
            //  document.write(`Connected Account ${accounts}`);
            }
            }>
            Connect to metamask
          </button> */}
          {/* <input type="number"  id="inputfild"/> */}
          &nbsp; 
          <button type="button" class="btn btn-success " onClick={transferFund}>
            Transfer
          </button>
          &nbsp;
          <button type="button" class="btn btn-primary " onClick={withdrawFund}>
                  Withdraw
          </button>
        </div>
        <div class="card-footer text-muted"></div>
      </div>
    </>
  );
}

export default App;
//npm install --save react-scripts@4.0.3
//web3 api must if we dont have web3 api we does not do any thing.
//pls change file name BasicApp.js to App.js