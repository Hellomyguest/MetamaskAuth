import { createEffect, createEvent, createStore, sample } from "effector";
import Web3 from "web3";

export const $session = createStore<string | null>(null);

export const signInFx = createEvent<string>();

$session
  .on(signInFx, (_, payload: string) => payload);

