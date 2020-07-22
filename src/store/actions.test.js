import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  loadInitialData,
  setRegions,
  setCategories,
  loadRestaurants,
  loadRestaurant,
  setRestaurants,
  setRestaurant,
  login,
  setAccessToken,
  addReview,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('actions', () => {
  let store;

  describe('loadInitialData', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setRegions and setCategories', async () => {
      await store.dispatch(loadInitialData());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRegions([]));
      expect(actions[1]).toEqual(setCategories([]));
    });
  });

  describe('loadRestaurants', () => {
    context('with selectedRegion and selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRegion: { id: 1, name: '서울' },
          selectedCategory: { id: 1, name: '한식' },
        });
      });

      it('runs setRestaurants', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurants([]));
      });
    });

    context('without selectedRegion', () => {
      beforeEach(() => {
        store = mockStore({
          selectedCategory: { id: 1, name: '한식' },
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('without selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRegion: { id: 1, name: '서울' },
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });

  describe('loadRestaurant', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatchs setRestaurant', async () => {
      await store.dispatch(loadRestaurant({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRestaurant(null));
      expect(actions[1]).toEqual(setRestaurant({}));
    });
  });

  describe('login', () => {
    context('with loginFields', () => {
      beforeEach(() => {
        store = mockStore({
          loginFields: {
            email: 'newEmail@example.com',
            password: 'newPassword',
          },
        });
      });

      it('dispatchs setAccessToken', async () => {
        await store.dispatch(login());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setAccessToken(null));
      });
    });

    context('without loginFields', () => {
      beforeEach(() => {
        store = mockStore({
          loginFields: null,
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(login());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });

  describe('addReview', () => {
    beforeEach(() => {
      store = mockStore({
        accessToken: 'ACCESS_TOKEN',
        restaurantId: '1',
        reviewField: {},
      });
    });

    context('with restaurantId', () => {
      beforeEach(() => {
        store = mockStore({});
      });

      it('dispatchs setRestaurant', async () => {
        await store.dispatch(addReview({ restaurantId: 1 }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurant(null));
      });
    });

    context('without restaurantId', () => {
      beforeEach(() => {
        store = mockStore({
          restaurantId: undefined,
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(addReview({ restaurantId: undefined }));

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });
});