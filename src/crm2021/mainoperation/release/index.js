import React, { useEffect, useState } from 'react';
import { Container, Divider, Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import Filter from './components/Filter';
import Table from './components/Table';
import { connect } from 'react-redux';
import Modal from './components/Modal';
import { MODAL_TYPE_CREATE, MODAL_TYPE_EDIT } from './components/Modal';
import {
    addRelease,
    editRelease,
    getAllReleases,
    removeRelease,
} from './action';
import _ from 'lodash';
import moment from 'moment';
import ConfirmationModal from './components/ConfirmationModal';

const CrmReleaseLog2021 = props => {
    const {
        intl: { messages },
        language,
        allReleases = [],
    } = props;

    const [loading, setLoading] = useState(false);
    const [release, setRelease] = useState({
        releaseVersion: '',
        releaseDate: null,
        releaseContent: '',
    });
    const [modalType, setModalType] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalErrors, setModalErrors] = useState({
        releaseDate: false,
        releaseVersion: false,
        releaseContent: false,
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [filterParams, setFilterParams] = useState({
        dateFrom: null,
        dateTo: null,
        description: '',
    });
    const [handledReleases, setHandledReleases] = useState([]);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [releaseIdToRemove, setReleaseIdToRemove] = useState(null);

    const handleChangeFilter = (e, data) => {
        const { name, value } = data;
        setFilterParams(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        props.getAllReleases();
    }, []);

    useEffect(() => {
        search(filterParams);
    }, [allReleases]);

    const search = params => {
        let filteredReleases = allReleases;
        filteredReleases = _.filter(filteredReleases, release => {
            return (
                release.releaseContent
                    .toLowerCase()
                    .indexOf(params.description.toLowerCase()) !== -1
            );
        });
        if (!isEmptyOrNull(params.dateFrom) && !isEmptyOrNull(params.dateTo)) {
            filteredReleases = _.filter(filteredReleases, release => {
                return (
                    moment(release.releaseDate).isSameOrAfter(
                        params.dateFrom,
                    ) &&
                    moment(release.releaseDate).isSameOrBefore(params.dateTo)
                );
            });
        }

        setHandledReleases(filteredReleases);
    };

    const clearFilterParams = () => {
        const clearedParams = {
            dateFrom: null,
            dateTo: null,
            description: '',
        };
        setFilterParams(clearedParams);
        search(clearedParams);
    };

    const edit = row => {
        clearModalErrors();
        setModalType(MODAL_TYPE_EDIT);
        setRelease(row);
        setModalOpen(true);
    };

    const remove = id => {
        setConfirmationModalOpen(true);
        setReleaseIdToRemove(id);
    };

    const modalSave = () => {
        if (modalFormValidation()) {
            setModalLoading(true);
            if (MODAL_TYPE_CREATE) {
                props.addRelease(release, () => {
                    setModalLoading(false);
                    setModalOpen(false);
                    props.getAllReleases();
                });
            } else {
                props.editRelease(release, () => {
                    setModalLoading(false);
                    setModalOpen(false);
                    props.getAllReleases();
                });
            }
        }
    };

    const modalFormValidation = () => {
        const { releaseVersion, releaseDate, releaseContent } = release;
        const errors = {
            releaseVersion: isEmptyOrNull(releaseVersion),
            releaseDate: isEmptyOrNull(releaseDate),
            releaseContent: isEmptyOrNull(releaseContent),
        };
        setModalErrors(errors);

        return !Object.values(errors).includes(true);
    };

    const isEmptyOrNull = field =>
        field === undefined || field === '' || field === null;

    const clearModalErrors = () => {
        setModalErrors({
            releaseDate: false,
            releaseVersion: false,
            releaseContent: false,
        });
    };

    const clearRelease = () => {
        setRelease({
            releaseVersion: '',
            releaseDate: null,
            releaseContent: '',
        });
    };

    return (
        <>
            <ConfirmationModal
                messages={messages}
                open={confirmationModalOpen}
                cancel={() => setConfirmationModalOpen(false)}
                remove={() => {
                    props.removeRelease(releaseIdToRemove, () => {
                        props.getAllReleases();
                    });
                    setConfirmationModalOpen(false);
                }}
            />
            <Modal
                language={language}
                messages={messages}
                release={release}
                open={modalOpen}
                loading={modalLoading}
                modalType={modalType}
                onChange={(e, data) => {
                    const { name, value } = data;
                    setRelease(prev => ({
                        ...prev,
                        [name]: value,
                    }));
                }}
                cancel={() => setModalOpen(false)}
                save={modalSave}
                errors={modalErrors}
                setOpen={open => setModalOpen(open)}
            />
            <Container
                fluid
                style={{
                    marginTop: '2em',
                    marginBottom: '2em',
                    paddingLeft: '2em',
                    paddingRight: '2em',
                }}
            >
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <h3>{messages['release_log']}</h3>
                    <Button
                        color="black"
                        onClick={() => {
                            clearRelease();
                            clearModalErrors();
                            setModalType(MODAL_TYPE_CREATE);
                            setModalOpen(true);
                        }}
                    >
                        {messages['BTN__ADD']}
                    </Button>
                </div>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <Filter
                    messages={messages}
                    filterParams={filterParams}
                    language={language}
                    onChange={handleChangeFilter}
                    loading={loading}
                    search={() => search(filterParams)}
                    clear={clearFilterParams}
                />
                <Table
                    messages={messages}
                    data={handledReleases}
                    edit={edit}
                    remove={remove}
                />
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    language: state.locales.lang,
    allReleases: state.crmReleaseLog2021Reducer.allReleases,
});

export default connect(mapStateToProps, {
    addRelease,
    editRelease,
    getAllReleases,
    removeRelease,
})(injectIntl(CrmReleaseLog2021));
