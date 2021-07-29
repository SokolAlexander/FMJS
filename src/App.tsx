import React from "react";
import { ContextStarter } from "./components/ContextStarter";
import { Slider } from "./components/Slider";
import { MuteBtn } from "./components/MuteBtn";

export interface HelloWorldProps {
  userName: string;
  lang: string;
}
export const App = (props: HelloWorldProps) => (
  <>
    <ContextStarter />
    <Slider />
    <MuteBtn />
    <h1>
      Hi {props.userName} from React! Welcome to {props.lang}!
    </h1>
  </>
);
