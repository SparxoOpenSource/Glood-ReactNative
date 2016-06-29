
import {
    ToastAndroid,
    AlertIOS,
} from 'react-native';
import isAndroid from '../utils/isAndroid';

export function Pop(params) {
    if (isAndroid()) {
        ToastAndroid.show(params, ToastAndroid.SHORT)
    } else {
        AlertIOS.alert(params);
    }
}