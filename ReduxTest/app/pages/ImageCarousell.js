import React, {Component, PropTypes} from "react";
import {
  View,
  Text,
  Image,
  ListView,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const propTypes = {
  dataSource: PropTypes.instanceOf(ListView.DataSource).isRequired,
  initialIndex: PropTypes.number,
  previewImageSize: PropTypes.number,
  renderScrollComponent: PropTypes.func,
  style: View.propTypes.style,
  previewContainerStyle: View.propTypes.style,
  imageStyle: View.propTypes.style,
  previewImageStyle: View.propTypes.style,
};

const defaultProps = {
  initialIndex: 0,
  previewImageSize: 80,
  renderScrollComponent: (props) => <ScrollView {...props} />,
};
export class ImageCarousell extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handlePreviewLayout = this.handlePreviewLayout.bind(this);
    this.renderScrollComponent = this.renderScrollComponent.bind(this);
    this.renderImageView = this.renderImageView.bind(this);
    this.renderImagePreview = this.renderImagePreview.bind(this);
    this._bias = 0;
    this._previewOffset = 0;
    this.state = {
      showPreview: true,
    };
    Alert.alert("999999");
  }

  componentDidMount() {
    const { initialIndex, previewImageSize } = this.props;
    this.refs.listView.scrollTo({ x: initialIndex * deviceWidth, animated: false });
    this.refs.previewListView.scrollTo({ x: (initialIndex - 2) * previewImageSize + this._bias, animated: false });
  }

  handleScroll(e) {
    const event = e.nativeEvent;

    // [0] Show preview only if zoom is disabled
    const newShowPreview = event.zoomScale <= 1;
    if (this.state.showPreview !== newShowPreview) {
      this.setState({ showPreview: newShowPreview });
    }
    if (!newShowPreview) {
      return;
    }

    // [1] If preview is displayed, adjust position to current image index
    const layoutWidth = event.layoutMeasurement.width;
    const currentIndex = Math.floor((event.contentOffset.x + 0.5 * layoutWidth) / layoutWidth);
    const newPreviewOffset = (currentIndex - 2) * this.props.previewImageSize + this._bias;
    if (this._previewOffset !== newPreviewOffset) {
      this.refs.previewListView.scrollTo({ x: newPreviewOffset });
      this._previewOffset = newPreviewOffset;
    }
  }

  handlePreviewLayout(e) {
    this._bias = e.nativeEvent.layout.width % this.props.previewImageSize / 2;
  }

  renderImageView(image) {
    let imageHeight = deviceHeight;
    if (this.state.showPreview) {
      imageHeight -= this.props.previewImageSize;
    }
    return (
      <Image
        style={[
          this.props.imageStyle,
          { width: deviceWidth, height: imageHeight }
        ]}
        source={image}
        resizeMode="contain"
        />
    );
  }

  renderImagePreview(image) {
    console.log(""+image)
    return (
      <Image
        style={[
          styles.previewImage,
          this.props.previewImageStyle,
          { width: this.props.previewImageSize, height: this.props.previewImageSize },
        ]}
        source={image}

        resizeMode="contain"
        />
    );
  }

  renderPreviewListView() {
    if (!this.state.showPreview) { return null; }
    return (
      <ListView
        renderScrollComponent={props => (
          <ScrollView
            {...props}
            horizontal={true}
            scrollEnabled={false}
            />) }
        initialListSize={10}
        onLayout={this.handlePreviewLayout}
        dataSource={this.props.dataSource}
        style={[
          styles.previewListView,
          this.props.previewContainerStyle,
          { height: this.props.previewImageSize }
        ]}
        renderRow={this.renderImagePreview}
        ref="previewListView"
        />
    );
  }

  renderScrollComponent(props) {
    return cloneElement(
      this.props.renderScrollComponent(props),
      {
        horizontal: true,
        pagingEnabled: true,
        maximumZoomScale: 3.0,
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,
      });
}

render() {
  return (
    <View style={[styles.container, this.props.style]}>
      <ListView
        renderScrollComponent={this.renderScrollComponent}
        onScroll={this.handleScroll}
        dataSource={this.props.dataSource}
        style={styles.listView}
        renderRow={this.renderImageView}
        ref="listView"
        />
      {this.renderPreviewListView() }
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listView: {
    flex: 4,
  },
  previewListView: {
    flex: 1,
    marginTop: 2,
    paddingTop: 2,
    borderTopWidth: 1,
    borderColor: '#CCCCCC',
  },
  previewImage: {
    marginLeft: 2,
    marginRight: 2,
  },
});
