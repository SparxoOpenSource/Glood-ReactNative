
import {
    ToastAndroid,
    AlertIOS,
    Alert,
} from 'react-native';
import isAndroid from '../utils/isAndroid';
import { RecordAudio } from "../utils/RecordAudio";
export function Pop(params) {
    RecordAudio.prototype.recordMsg(params);
}