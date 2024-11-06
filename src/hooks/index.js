import { TimerContext } from "../contexts/TimerContext";
import { SettingsContext } from "../contexts/SettingsContext";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";
import { TaskContext } from '../contexts/TaskContext'
import { useContext } from "react";


export const useTimer = () => useContext(TimerContext);
export const useSettings = () => useContext(SettingsContext);
export const useMusicPlayer = () => useContext(MusicPlayerContext);
export const useTaskManager = () => useContext(TaskContext);