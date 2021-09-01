import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { Button, Segment, Sidebar, Popup, Divider } from 'semantic-ui-react';

import VerticalSidebar from './components/VerticalSidebar';
import ReportSlc from './components/ReportSlc';
import { YMaps, Map, Clusterer, Placemark } from 'react-yandex-maps';
import {
    f4FetchCountryList,
    f4GetLocationAddressYandex,
} from '../../../reference/f4/f4_action';
import {
    fetchHrslcList,
    clearHrslcList,
    fetchStaffList,
    clearStaffList,
    fetchWorkStatusList,
    clearWorkStatusList,
    fetchBusinessProcessList,
    clearBusinessProcessList,
} from './hrslcAction';
import { pointsYMap } from './components/pointsYMap';
import { Grid } from 'semantic-ui-react';

const Hrslc = props => {
    const {
        countryList = [],
        //language,
        companyOptions = [],
        branchOptionsAll = {},
        hrslcList = [],
        //staffHrslcList = [],
        //workStatusList = [],
        //businessProcessList = [],
        //yandexData = {},
    } = props;

    const [stateHrslcList, setStateHrslcList] = useState([]);
    const [tempAddress, setTempAddress] = useState('');
    useEffect(() => {
        if (hrslcList.length > 0) {
            setStateHrslcList(
                hrslcList.map((item, index) => {
                    return {
                        ...item,
                        address: '',
                        tempId: parseInt(
                            `${index + 1}${Math.floor(Math.random() * 10000)}`,
                        ),
                    };
                }),
            );
        }
    }, [hrslcList]);

    const [state, setState] = useState({
        animation: 'slide along',
        direction: 'left',
        dimmed: false,
        visible: true,
    });

    const [param, setParam] = useState({
        countryId: null,
        bukrs: null,
        branchId: null,
        positionId: null,
        staffId: null,
    });

    useEffect(() => {
        if (
            param.countryId &&
            param.bukrs &&
            param.branchId &&
            param.positionId
        ) {
            props.fetchStaffList({
                countryId: param.countryId,
                bukrs: param.bukrs,
                branchId: param.branchId,
                positionId: param.positionId,
            });
        } else if (param.countryId && param.bukrs && param.branchId) {
            props.fetchStaffList({
                countryId: param.countryId,
                bukrs: param.bukrs,
                branchId: param.branchId,
            });
        } else if (param.bukrs && param.branchId && param.positionId) {
            props.fetchStaffList({
                bukrs: param.bukrs,
                branchId: param.branchId,
                positionId: param.positionId,
            });
        } else if (param.bukrs && param.branchId) {
            props.fetchStaffList({
                bukrs: param.bukrs,
                branchId: param.branchId,
            });
        } else {
            props.clearStaffList();
        }
    }, [param.countryId, param.bukrs, param.branchId, param.positionId]);

    useEffect(() => {
        props.f4FetchCountryList();
        props.fetchWorkStatusList();
        props.fetchBusinessProcessList();
    }, []);

    const mapCompanyOptions = companyOptions.map(item => {
        return {
            key: item.key,
            text: item.text,
            value: item.value,
        };
    });

    const mapCountryOptions = countryList.map(item => {
        return {
            key: item.countryId,
            text: item.country,
            value: item.countryId,
        };
    });

    const positionOptions = [
        {
            key: 9,
            text: 'Финансовый агент',
            value: 9,
        },
        {
            key: 4,
            text: 'Дилер',
            value: 4,
        },
        {
            key: 3,
            text: 'Менеджер',
            value: 3,
        },
        {
            key: 16,
            text: 'Мастер уборочной системы',
            value: 16,
        },
        {
            key: 17,
            text: 'Мастер системы очистки воды',
            value: 17,
        },
    ];

    const filterMapPoints = pointsYMap
        .filter(item =>
            param.country ? item.country == param.country : item.country,
        )
        .filter(item => (param.bukrs ? item.bukrs == param.bukrs : item.bukrs));

    const initialMapState = {
        center: [46.1258678, 63.4084559],
        zoom: 5,
    };

    const [mapState, setMapState] = useState({
        ...initialMapState,
    });

    const mapp = param.branchId
        ? branchOptionsAll[param.bukrs].filter(
              item => item.value === param.branchId,
          )
        : '';

    const mapCenter =
        mapp.length > 0
            ? [mapp[0].centerLatitude, mapp[0].centerLongitude]
            : initialMapState.center;
    useEffect(() => {
        param.branchId
            ? setMapState({ ...mapState, center: mapCenter, zoom: 12 })
            : setMapState({ ...initialMapState });
    }, [param.branchId]);
    console.log('mapState', mapState);

    const [toggleStatus, setToggleStatus] = useState(false);

    const { animation, dimmed, direction, visible } = state;

    const onChangeVerticalSideBar = (fieldName, value) => {
        switch (fieldName) {
            //Страна --
            case 'changeCountry':
                setParam({ ...param, countryId: value });
                break;
            case 'clearCountry':
                setParam({ ...param, countryId: null });
                break;
            //Компания --
            case 'changeCompany':
                setParam({ ...param, bukrs: value, branchId: null });
                break;
            case 'clearCompany':
                setParam({ ...param, bukrs: null, branchId: null });
                break;
            //Филиал --
            case 'changeBranch':
                setParam({ ...param, branchId: value });
                break;
            case 'clearBranch':
                setParam({ ...param, branchId: null });
                break;
            //Должность --
            case 'changePosition':
                setParam({ ...param, positionId: value });
                break;
            case 'clearPosition':
                setParam({ ...param, positionId: null });
                break;
            //Сотрудник --
            case 'changeStaff':
                setParam({ ...param, staffId: value });
                break;
            case 'clearStaff':
                setParam({ ...param, staffId: null });
                break;
            //--
            case 'toggleFilter':
                setToggleStatus(!toggleStatus);
                break;

            case 'buttonSearch':
                setStateHrslcList([]);
                props.clearHrslcList();
                props.fetchHrslcList(param);

                break;
        }
    };

    const getPointData = data => {
        return {
            balloonContentHeader: data.staffFIO,
            balloonContentBody:
                '</table>' +
                '<tr><td>Страна: </td><td><strong>' +
                data.countryName +
                '</strong><br></td></tr>' +
                '<tr><td>Компания: </td><td><strong>' +
                data.companyName +
                '</strong><br></td></tr>' +
                '<tr><td>Филиал: </td><td><strong>' +
                data.branchName +
                '</strong><br></td></tr>' +
                '<tr><td>Должность: </td><td><strong>' +
                data.positionName +
                '</strong><br></td></tr>' +
                '<tr><td>Статус: </td><td><strong>' +
                data.maTrackStepName +
                '</strong><br></td></tr>' +
                '<tr><td>Адрес: </td><td><strong>' +
                data.address +
                '</strong></td></tr></table>',
            clusterCaption: 'placemark <strong>' + data.index + '</strong>',
        };
    };

    // const getPointOptions = () => {
    //   return {
    //     preset: 'islands#violetIcon',
    //   };
    // };

    const balloonContent = () => {
        return <div>balloon 555</div>;
    };

    const closeCurrentBalloon = () => {
        let close = document.querySelector(
            'ymaps[class$="-balloon__close-button"]',
        );
        if (close != null) {
            close.click();
        }
    };

    const handleClickPlacemark = data => {
        setTempAddress('');
        props.f4GetLocationAddressYandex(
            {
                geocode: `${data.longitude},${data.latitude}`,
            },
            address => {
                setTempAddress(address);
                setStateHrslcList(
                    stateHrslcList.map(item =>
                        item.tempId == data.tempId
                            ? {
                                  ...item,
                                  address: address,
                              }
                            : item,
                    ),
                );
            },
        );
    };

    return (
        <Container
            style={{ display: 'flex' }}
            fluid
            style={{ width: '100%', height: '100%' }}
        >
            <Sidebar.Pushable
                as={Segment}
                style={{ width: '100%', height: '100%' }}
            >
                <VerticalSidebar
                    animation={animation}
                    direction={direction}
                    visible={visible}
                    param={param}
                    companyOptions={mapCompanyOptions}
                    countryOptions={mapCountryOptions}
                    branchByBukrs={branchOptionsAll[param.bukrs]}
                    onChangeVerticalSideBar={onChangeVerticalSideBar}
                    toggleStatus={toggleStatus}
                    positionOptions={positionOptions}
                />
                <Divider vertical>And</Divider>
                <Sidebar.Pusher
                    dimmed={dimmed && visible}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Segment
                        style={{
                            height: '100%',
                            width: '100%',
                            padding: '1px',
                        }}
                    >
                        <Popup
                            content={
                                state.visible
                                    ? 'Скрыть фильтр'
                                    : 'Показать фильтр'
                            }
                            trigger={
                                <Button
                                    style={{
                                        position: 'absolute',
                                        zIndex: '1000',
                                    }}
                                    onClick={() =>
                                        setState({
                                            ...state,
                                            visible: !visible,
                                        })
                                    }
                                    circular
                                    color="teal"
                                    icon="filter"
                                />
                            }
                        />
                        {toggleStatus ? (
                            <YMaps style={{ width: '100%', height: '100%' }}>
                                <Map
                                    state={mapState}
                                    style={{ width: '100%', height: '100%' }}
                                    onClick={closeCurrentBalloon}
                                >
                                    <Clusterer
                                        options={{
                                            preset:
                                                'islands#invertedNightClusterIcons',
                                            groupByCoordinates: false,
                                            clusterDisableClickZoom: true,
                                            clusterHideIconOnBalloonOpen: false,
                                            geoObjectHideIconOnBalloonOpen: false,
                                        }}
                                    >
                                        {stateHrslcList.map((item, index) => (
                                            <Placemark
                                                key={index}
                                                geometry={[
                                                    item.latitude,
                                                    item.longitude,
                                                ]}
                                                properties={getPointData(item)}
                                                onClick={() =>
                                                    handleClickPlacemark(item)
                                                }
                                                modules={[
                                                    'geoObject.addon.balloon',
                                                    'geoObject.addon.hint',
                                                ]}
                                                options={{
                                                    preset:
                                                        item.positionId === 3
                                                            ? 'islands#bluePersonIcon'
                                                            : item.positionId ===
                                                              4
                                                            ? 'islands#bluePersonIcon'
                                                            : item.positionId ===
                                                              9
                                                            ? 'islands#blueMoneyIcon'
                                                            : item.positionId ===
                                                              16
                                                            ? 'islands#oliveRepairShopIcon'
                                                            : item.positionId ===
                                                              17
                                                            ? 'islands#greenRepairShopIcon'
                                                            : 'islands#blueStarIcon',
                                                }}
                                            />
                                        ))}
                                    </Clusterer>
                                </Map>
                            </YMaps>
                        ) : (
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column width={13}>
                                        <ReportSlc
                                            data={stateHrslcList}
                                            filterMapPoints={filterMapPoints}
                                            handleClickPlacemark={
                                                handleClickPlacemark
                                            }
                                            tempAddress={tempAddress}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={3}></Grid.Column>
                                </Grid.Row>
                            </Grid>
                        )}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        language: state.locales.lang,
        countryList: state.f4.countryList,
        companyOptions: state.userInfo.companyOptions,
        branchOptionsAll: state.userInfo.branchOptionsAll,
        //
        yandexData: state.f4.yandexData,
        hrslcList: state.hrslcReducer.hrslcList,
        staffHrslcList: state.hrslcReducer.staffHrslcList,
        workStatusList: state.hrslcReducer.workStatusList,
        businessProcessList: state.hrslcReducer.businessProcessList,
    };
}

export default connect(mapStateToProps, {
    f4FetchCountryList,
    f4GetLocationAddressYandex,
    //
    fetchHrslcList,
    clearHrslcList,
    fetchStaffList,
    clearStaffList,
    fetchWorkStatusList,
    clearWorkStatusList,
    fetchBusinessProcessList,
    clearBusinessProcessList,
})(injectIntl(Hrslc));
