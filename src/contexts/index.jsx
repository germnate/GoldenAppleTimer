import { MusicPlayerProvider } from "./MusicPlayerContext";
import { SettingsProvider } from "./SettingsContext";
import { TaskProvider } from "./TaskContext";
import { TimerProvider } from "./TimerContext";

export function Provider({ children }) {
    return (
        <MusicPlayerProvider>
            <SettingsProvider>
                <TaskProvider>
                    <TimerProvider>
                        {children}
                    </TimerProvider>
                </TaskProvider>
            </SettingsProvider>
        </MusicPlayerProvider>
    )
}