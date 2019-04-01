import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback, ListView, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import AppUtil from '../../utils/AppUtil';
import LinearGradient from 'react-native-linear-gradient';

const viewHeight = AppUtil.windowWidth * 82.0 / 75.0;
const viewWidth = AppUtil.windowWidth;

// var vMargin = (viewWidth - cellW * cols) / (cols + 1);

class ModuleItem extends Component {

    render() {
        const { item } = this.props;
        return (
            <View style={[styles.moduleItem, this.props.itemStyle]}>
                <Image style={styles.moduleItemImage} source={{ url: item.picUrl }} />
                <Text style={styles.moduleItemTitle}>{item.title}</Text>
            </View>
        );
    }
}

export default class HomeBannerModuleCell extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds,
        };
    }

    _renderBannerItems() {
        const { banners } = this.props;

        images = [];
        for (var i = 0; i < banners.length; i++) {
            let image =
                <TouchableWithoutFeedback
                    key={i}
                    onPress={() => {

                    }}>
                    <Image style={styles.image} source={{ url: banners[i].picUrl }} />
                </TouchableWithoutFeedback>;
            images.push(image);
        }

        if (!images.length) {
            let defaultBanner = <Image
                key={0}
                style={styles.image}
                source={require('../../resource/images/banner_default.jpg')}
            />;
            images.push(defaultBanner);
        }

        return images;
    }

    _moduleView() {
        const { modules } = this.props;
        let index = -1;
        return (
            <View style={styles.moduleContainer}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(modules)}
                    contentContainerStyle={styles.moduleList}
                    renderRow={(rowData, rowID) => {
                        index++;
                        return <ModuleItem itemStyle={{ marginTop: index > 3 ? 10 : 0 }} item={rowData} />
                    }}
                />
            </View>

        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    autoplay={true}
                    autoplayTimeout={3.0}
                    autoplayDirection={true}
                // showsPagination={true}
                // paginationStyle={{ top: (AppUtil.windowWidth - 30) * 0.55 + 10, height: 30 }}
                // loop={banner.length > 1}
                // onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                // dot={<View style={styles.dotStyle} />}
                // activeDot={<View style={styles.activeDot} />}
                // paginationStyle={{
                //     bottom: -23, left: null, right: 10
                // }}
                >
                    {this._renderBannerItems()}
                </Swiper>
                <LinearGradient
                    locations={[0, 0.7, 1.0]}
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.7)', '#FFFFFF']}
                    style={styles.gradientLayer}
                />
                {this._moduleView()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: viewHeight,
        width: viewWidth,
    },
    image: {
        height: viewHeight,
        width: viewWidth,
        resizeMode: 'contain'
    },
    dotStyle: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 5,
        height: 5,
        borderRadius: 4,
    },
    activeDot: {
        backgroundColor: '#000',
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    gradientLayer: {
        position: 'absolute',
        top: viewWidth * 0.625,
        left: 0,
        right: 0,
        bottom: 0
    },
    moduleContainer: {
        position: 'absolute',
        left: 15,
        right: 15,
        bottom: 10,
        height: (viewWidth - 30) * 0.55,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 7,
        shadowOpacity: 1.0,
    },
    moduleList: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 23
    },
    moduleItem: {
        width: (viewWidth - 30) / 4.0,
        height: ((viewWidth - 30) * 0.55 - 57) / 2.0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    moduleItemImage: {
        width: 54,
        height: 54,
        resizeMode: 'contain'
    },
    moduleItemTitle: {
        fontSize: 10,
        color: AppUtil.app_black
    }
});
