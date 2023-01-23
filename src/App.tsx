import { Button, Layout, theme } from "antd";
import { useUnit } from "effector-react";
import { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import { $session, signInFx } from "./entities/auth/session";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { useWeb3Modal, Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon } from "wagmi/chains";

const { Header, Content, Footer } = Layout;

const chains = [arbitrum, mainnet, polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "27e484dcd9e3efcfd25a83a78777cdf1" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);



export const App = () => {
  const [signIn, session] = useUnit([signInFx, $session]);
  const { isOpen, open, close } = useWeb3Modal();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickLogin = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.requestAccounts();
    signIn(accounts[0]);
  };

  const handleClick = () => {
    console.log(session);
  };

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Button type="primary" onClick={handleClickLogin}>
              Login
            </Button>
            <Button type="primary" onClick={handleClick}>
              show me the store
            </Button>
            <Button type="primary" onClick={() => open}>
              Open walletConnect
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
      </WagmiConfig>
      <Web3Modal
        projectId="27e484dcd9e3efcfd25a83a78777cdf1"
        ethereumClient={ethereumClient}
      />
    </>
  );
};
