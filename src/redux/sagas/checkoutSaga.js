import { PLACE_ORDER,GET_ORDERS } from 'constants/constants';
import firebase from 'services/firebase';
import { call, put, select } from 'redux-saga/effects';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions';
import { placeOrder } from 'redux/actions/basketActions'

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || 'Failed to fetch products'));
  console.log('ERROR: ', e);
}

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}
function* checkoutSaga({ type, payload }) {
  switch (type) {
    case GET_ORDERS:
      try {
        initRequest();
        const result = yield call(firebase.getOrders);
        console.log('result length ' + result.length);
        //console.log('result details ' + JSON.stringify(result));
        return result;
      } catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;
    case PLACE_ORDER:
      try {
        console.log('payload ' + payload.id);
        initRequest();
        yield call(firebase.addOrder, payload.id, payload);
      } catch (e) {
        yield handleError(e);
      }
      break;
    default: console.log('default');
      break;
  }
}

export default checkoutSaga;