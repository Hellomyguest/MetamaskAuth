import { Button, Layout, theme } from "antd";
import { useUnit } from "effector-react";
import Web3 from "web3";
import "./App.css";
import { $session, signInFx } from "./entities/auth/session";

const { Header, Content, Footer } = Layout;

const web3 = new Web3(Web3.givenProvider);
console.log()
const contract = new web3.eth.Contract(
  [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      inputs: [
        { internalType: "address", name: "_address", type: "address" },
      ],
      name: "getCountGame",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_count", type: "uint256" },
        { internalType: "address", name: "_address", type: "address" },
      ],
      name: "getLastSpin",
      outputs: [
        { internalType: "uint256[9][]", name: "", type: "uint256[9][]" },
        { internalType: "uint256[]", name: "", type: "uint256[]" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_count", type: "uint256" },
      ],
      name: "getLastWinSpin",
      outputs: [
        { internalType: "address[]", name: "", type: "address[]" },
        { internalType: "uint256[9][]", name: "", type: "uint256[9][]" },
        { internalType: "uint256[]", name: "", type: "uint256[]" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "referralProgramContract",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "referralsContract",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_address_Lottery",
          type: "address",
        },
        {
          internalType: "address",
          name: "_address_RefferalProgram",
          type: "address",
        },
        {
          internalType: "address",
          name: "_address_Referrals",
          type: "address",
        },
      ],
      name: "setContracts",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_price", type: "uint256" },
      ],
      name: "setMinPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_address", type: "address" },
      ],
      name: "setReferralProgramContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_address", type: "address" },
      ],
      name: "setReferralsContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_address", type: "address" },
      ],
      name: "setWeeklyLotteryContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_ref", type: "address" }],
      name: "startGame",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "startGame",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "weeklyLotteryContract",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  "0x8014704FcB1BE803072981CB5a8f3504eb751d80"
);

export const App = () => {
  const [signIn, session] = useUnit([signInFx, $session]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickLogin = async () => {
    
    const accounts = await web3.eth.requestAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const user = {
      address: accounts[0],
      balance,
    };
    console.log(user);
    signIn(user);
  };

  const handleClickContractRead = async () => {
    
    const count = await contract.methods
      .getLastWinSpin(1)
      .call();
    console.log(count)
  };

  const handleClick = () => {
    console.log(session);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Button type="primary" onClick={handleClickLogin}>
          Login
        </Button>
        <Button type="primary" onClick={handleClick}>
          show me the store
        </Button>
        <Button type="primary" onClick={handleClickContractRead}>
          Contract
        </Button>
      </Header>
      <Content style={{ padding: "50px", height: "100%" }}>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
