import { makeEnvironmentProviders } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export interface LayoutState {
  sidebarVisible: boolean;
  sidebarShrink: boolean;
  isShrink: boolean;
}

export const LayoutStore = signalStore(
  withState<LayoutState>({
    sidebarVisible: true,
    sidebarShrink: false,
    isShrink: false
  }),

  withMethods((store) => ({
    setSidebarVisible: (value: boolean) => {
      patchState(store, { sidebarVisible: value });
    },

    setSidebarShrink: (value: boolean) => {
      patchState(store, { sidebarShrink: value });
    },

    setIsShrink: (value: boolean) => {
      patchState(store, { isShrink: value });
    },

    toggleSidebar: () => {
      if (!store.sidebarShrink()) {
        patchState(store, { sidebarVisible: !store.sidebarVisible() })
      } else {
        patchState(store, { isShrink: !store.isShrink() })
      }
    },

  })),
);

export function provideLayoutStore() {
  return makeEnvironmentProviders([LayoutStore]);
}
