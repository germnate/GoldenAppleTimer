import { TimerContext } from "../contexts/TimerContext";
import { SettingsContext } from "../contexts/SettingsContext";
import { useContext } from "react";


export const useTimer = () => useContext(TimerContext);
export const useSettings = () => useContext(SettingsContext);