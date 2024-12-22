import { create } from 'zustand';

interface HomeState {
  chartData: any | null;
  workersData: any | null;
  originsData: any | null;
  setChartData: (data: any) => void;
  setWorkersData: (data: any) => void;
  setOriginsData: (data: any) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  chartData: null,
  workersData: null,
  originsData: null,
  setChartData: (data) => set({ chartData: data }),
  setWorkersData: (data) => set({ workersData: data }),
  setOriginsData: (data) => set({ originsData: data }),
}));
