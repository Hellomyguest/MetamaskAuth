import { Button, Layout, theme } from "antd";
import { useUnit } from "effector-react";
import { useState, useEffect } from "react";
import Web3 from 'web3';
import "./App.css";
import { $session, signInFx } from "./entities/auth/session";

const { Header, Content, Footer } = Layout;

export const App = () => {
  const [signIn, session] = useUnit([signInFx, $session])
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickLogin = async () => {
    const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.requestAccounts();
      signIn(accounts[0])
  }

  const handleClick = () => {
    console.log(session);
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Button type="primary" onClick={handleClickLogin}>Login</Button>
        <Button type="primary" onClick={handleClick}>show me the store</Button>
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

