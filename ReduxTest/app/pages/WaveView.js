'use strict';


import { requireNativeComponent, PropTypes} from 'react-native';


var iface = {
    name: 'WaveView',
    propTypes: {
        backgroundColor: PropTypes.number
    },
};

module.exports = requireNativeComponent('RCTWaveView', iface);