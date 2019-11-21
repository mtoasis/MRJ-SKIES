import { takeLatest, call, put, all } from 'redux-saga/effects'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import ShopActionTypes from './shop.types'
import {fetchCollectionsSuccess, fetchCollectionsFailure} from './shop.actions'

export function* fetchCollectionsAsync() {
    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get()
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap, 
            snapshot); //this is same as const collectionsMap = convertCollectionSnapshotToMap(snapshot), but using call() 
        yield put(fetchCollectionsSuccess(collectionsMap)) // this is same as dispatch(fetchCollectionsSuccess(collectionsMap)) using a redux-saga put()
    } 
    catch(error){        
        yield put(fetchCollectionsFailure(error.message))
    }   
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSaga(){
    yield all([
        call(fetchCollectionsStart)
    ])
}

//redux-sage takes a generator function (function*) and stops at yield point.
//when takeEvery is called, this go through all actions in order.

