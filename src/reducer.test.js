import reducer from './reducer';

import {
  setRegions,
  setCategories,
  setRestaurants,
  setRestaurant,
  selectRegion,
  selectCategory,
  logout,
  changeLoginField,
  setAccessToken,
  changeReviewFields,
  setReviews,
  clearReviewFields,
} from './actions';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      regions: [],
      categories: [],
      restaurants: [],
      restaurant: {
        reviews: [],
      },
      selectedRegion: null,
      selectedCategory: null,
      accessToken: '',
      loginFields: {
        email: '',
        password: '',
      },
      reviewFields: {
        score: '',
        description: '',
      },
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setRegions', () => {
    it('changes regions', () => {
      const initialState = {
        regions: [],
      };

      const regions = [
        { id: 1, name: '서울' },
      ];

      const state = reducer(initialState, setRegions(regions));

      expect(state.regions).toHaveLength(1);
    });
  });

  describe('setCategories', () => {
    it('changes categories', () => {
      const initialState = {
        categories: [],
      };

      const categories = [
        { id: 1, name: '한식' },
      ];

      const state = reducer(initialState, setCategories(categories));

      expect(state.categories).toHaveLength(1);
    });
  });

  describe('setRestaurants', () => {
    it('changes restaurants', () => {
      const initialState = {
        restaurants: [],
      };

      const restaurants = [
        { id: 1, name: '마법사주방' },
      ];

      const state = reducer(initialState, setRestaurants(restaurants));

      expect(state.restaurants).toHaveLength(1);
    });
  });

  describe('setRestaurant', () => {
    it('changes restaurant', () => {
      const initialState = {
        restaurant: null,
      };

      const restaurant = { id: 1, name: '마법사주방' };

      const state = reducer(initialState, setRestaurant(restaurant));

      expect(state.restaurant.id).toBe(1);
      expect(state.restaurant.name).toBe('마법사주방');
    });
  });

  describe('selectRegion', () => {
    it('changes selected region', () => {
      const initialState = {
        regions: [
          { id: 1, name: '서울' },
        ],
        selectedRegion: null,
      };

      const state = reducer(initialState, selectRegion(1));

      expect(state.selectedRegion).toEqual({
        id: 1,
        name: '서울',
      });
    });
  });

  describe('selectCategory', () => {
    it('changes selected category', () => {
      const initialState = {
        categories: [
          { id: 1, name: '한식' },
        ],
        selectedCategory: null,
      };

      const state = reducer(initialState, selectCategory(1));

      expect(state.selectedCategory).toEqual({
        id: 1,
        name: '한식',
      });
    });
  });

  describe('logout', () => {
    const initialState = {
      accessToken: '',
    };

    it('initializes the access token', () => {
      const state = reducer(initialState, logout());

      expect(state.accessToken).toBe('');
    });
  });

  describe('changeLoginField', () => {
    const initialState = {
      loginFields: {
        email: '',
        password: '',
      },
    };

    it('changes email', () => {
      const state = reducer(initialState, changeLoginField({ name: 'email', value: 'test@test' }));

      expect(state.loginFields.email).toBe('test@test');
    });

    it('changes password', () => {
      const state = reducer(initialState, changeLoginField({ name: 'password', value: '123456' }));

      expect(state.loginFields.password).toBe('123456');
    });
  });

  describe('setReviews', () => {
    const initialState = {
      restaurant: {
        reviews: [],
      },
    };

    const reviews = [
      {
        id: 1, name: '냥냥이', score: 5, description: 'good',
      },
    ];

    it('adds a new review and changes reviews', () => {
      const state = reducer(initialState, setReviews({ reviews }));

      expect(state.restaurant.reviews).toEqual(reviews);
    });
  });

  describe('setAccessToken', () => {
    const initialState = {
      accessToken: '',
    };

    const newToken = 'NEW_TOKEN';

    it('changes access token', () => {
      const state = reducer(initialState, setAccessToken(newToken));

      expect(state.accessToken).toBe(newToken);
    });
  });

  describe('changeReviewFields', () => {
    const initialState = {
      reviewFields: {
        score: '',
        description: '',
      },
    };

    it('changes score', () => {
      const state = reducer(initialState,
        changeReviewFields({
          name: 'score',
          value: 10,
        }));

      expect(state.reviewFields.score).toEqual(10);
    });

    it('changes description', () => {
      const state = reducer(initialState,
        changeReviewFields({
          name: 'description',
          value: 'good~',
        }));

      expect(state.reviewFields.description).toEqual('good~');
    });
  });

  describe('clearReviewFields', () => {
    const initialState = {
      reviewFields: {
        score: 5,
        description: 'JMT',
      },
    };

    it('clears review fields', () => {
      const state = reducer(initialState, clearReviewFields());

      const { reviewFields: { score, description } } = state;
      expect(score).toEqual('');
      expect(description).toEqual('');
    });
  });
});
