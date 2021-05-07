import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants.js';

// will do the below mentioned thing which was earlier done in HomeScreen
// useEffect(() => {
//   const fetchProducts = async () => {
//     const { data } = await axios.get('/api/products');
//     setProducts(data);
//   };
//   fetchProducts();
// }, []);

// Below is the Action Creator method
// Here THUNK is used for => async (dispatch) =>
export const listProducts = () => async (dispatch) => {
  try {
    // dispatch({}) is used to dispatch an action
    dispatch({ type: PRODUCT_LIST_REQUEST }); // will make loading = true

    const { data } = await axios.get('/api/products');
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data, // will be sent to reducer and the reducer will handle it by changing the state accordingly
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// action for single product
export const listProductsDetails = (id) => async (dispatch) => {
  try {
    // dispatch({}) is used to dispatch an action
    dispatch({ type: PRODUCT_DETAILS_REQUEST }); // will make loading = true

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data, // will be sent to reducer and the reducer will handle it by changing the state accordingly
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
