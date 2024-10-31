import { TimerContext } from "../contexts/TimerContext";
import { useContext } from "react";


export const useTimer = () => useContext(TimerContext);