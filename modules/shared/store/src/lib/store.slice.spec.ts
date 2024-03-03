import { fetchStore, storeAdapter, storeReducer } from './store.slice';

describe('store reducer', () => {
  it('should handle initial state', () => {
    const expected = storeAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(storeReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchStore', () => {
    let state = storeReducer(undefined, fetchStore.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      }),
    );

    state = storeReducer(state, fetchStore.fulfilled([{ id: 1 }], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      }),
    );

    state = storeReducer(state, fetchStore.rejected(new Error('Uh oh'), ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
        ids: [1],
      }),
    );
  });
});
