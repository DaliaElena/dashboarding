import { create } from 'zustand';

interface TableState {
  page: number;
  rowsPerPage: number;
  searchTerm: string;
  sortConfig: { key: string | null; direction: 'asc' | 'desc' | null };
  setPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setSortConfig: (config: { key: string | null; direction: 'asc' | 'desc' }) => void;
}

export const useTableStore = create<TableState>((set) => ({
  page: 0,
  rowsPerPage: 5,
  searchTerm: '',
  sortConfig: { key: null, direction: null },
  setPage: (page) => set({ page }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSortConfig: (sortConfig) => set({ sortConfig }),
}));
