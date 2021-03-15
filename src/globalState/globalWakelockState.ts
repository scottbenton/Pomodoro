import {createState, useState} from '@hookstate/core';
import {Persistence} from '@hookstate/persistence';

interface IWakelockState {
    wakelocksSupported: boolean;
    wakelocksEnabled: boolean;
}

const wakelocksSupported = 'wakeLock' in navigator;

const wakelockState = createState<IWakelockState>({
    wakelocksSupported,
    wakelocksEnabled: false,
});

wakelockState.attach(Persistence("wakelockSettingsKey"));

export const useWakelockSettings = () => useState(wakelockState);