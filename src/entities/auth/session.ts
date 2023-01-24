import { createEvent, createStore } from "effector";

export type Session = {
  address: string;
  balance: string;
}
export const $session = createStore<Session | null>(null);

export const signInFx = createEvent<Session>();

$session
  .on(signInFx, (_, payload: Session) => payload);
