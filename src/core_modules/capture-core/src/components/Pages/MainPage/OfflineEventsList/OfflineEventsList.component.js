// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';

import i18n from '@dhis2/d2-i18n';
import elementTypes from '../../../../metaData/DataElement/elementTypes';

import getTableComponents from '../../../d2Ui/dataTable/getTableComponents';
import basicTableAdapter from '../../../d2UiReactAdapters/dataTable/basicTable.adapter';

import SortLabelWrapper from '../../../DataTable/SortLabelWrapper.component';
import { directions, placements } from '../../../d2UiReactAdapters/dataTable/componentGetters/sortLabel.const';

// $FlowSuppress
const { Table, Row, Cell, HeaderCell, Head, Body } = getTableComponents(basicTableAdapter);

const styles = theme => ({
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        borderColor: theme.palette.type === 'light'
            ? lighten(fade(theme.palette.divider, 1), 0.88)
            : darken(fade(theme.palette.divider, 1), 0.8),
        borderWidth: '1px',
        borderStyle: 'solid',
    },
    topBarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    tableContainer: {
        overflow: 'auto',
    },
    optionsIcon: {
        color: theme.palette.primary.main,
    },
    table: {},
    row: {},
    dataRow: {
        cursor: 'pointer',
    },
    cell: {
        padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 7}px ${theme.spacing.unit /
            2}px ${theme.spacing.unit * 3}px`,
        '&:last-child': {
            paddingRight: theme.spacing.unit * 3,
        },
        borderBottomColor: theme.palette.type === 'light'
            ? lighten(fade(theme.palette.divider, 1), 0.88)
            : darken(fade(theme.palette.divider, 1), 0.8),
    },
    bodyCell: {
        fontSize: theme.typography.pxToRem(13),
        color: theme.palette.text.primary,
    },
    headerCell: {
        fontSize: theme.typography.pxToRem(12),
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightMedium,
    },
});

type Column = {
    id: string,
    header: string,
    visible: boolean,
    type: $Values<typeof elementTypes>,
};

type Props = {
    dataSource: Array<{eventId: string, [elementId: string]: any}>,
    columns: ?Array<Column>,
    classes: {
        loaderContainer: string,
        container: string,
        topBarContainer: string,
        tableContainer: string,
        optionsIcon: string,
        table: string,
        cell: string,
        headerCell: string,
        bodyCell: string,
        footerCell: string,
        row: string,
        dataRow: string,
    },
    sortById: string,
    sortByDirection: string,
    onRowClick: (rowData: {eventId: string}) => void,
};

class OfflineEventsList extends Component<Props> {
    static typesWithAscendingInitialDirection = [
        elementTypes.TEXT,
        elementTypes.LONG_TEXT,
    ];

    static typesWithRightPlacement = [
        elementTypes.NUMBER,
        elementTypes.INTEGER,
        elementTypes.INTEGER_POSITIVE,
        elementTypes.INTEGER_NEGATIVE,
        elementTypes.INTEGER_ZERO_OR_POSITIVE,
    ];

    renderHeaderRow(visibleColumns: Array<Column>) {
        const sortById = this.props.sortById;
        const sortByDirection = this.props.sortByDirection;

        const headerCells = visibleColumns
            .map(column => (
                <HeaderCell
                    key={column.id}
                    className={classNames(this.props.classes.cell, this.props.classes.headerCell)}
                >
                    <SortLabelWrapper
                        isActive={column.id === sortById}
                        initialDirection={
                            OfflineEventsList.typesWithAscendingInitialDirection.includes(column.type)
                                ? directions.ASC
                                : directions.DESC
                        }
                        placement={
                            OfflineEventsList.typesWithRightPlacement.includes(column.type)
                                ? placements.RIGHT
                                : placements.LEFT
                        }
                        direction={sortByDirection}
                        disabled
                    >
                        {column.header}
                    </SortLabelWrapper>
                </HeaderCell>
            ));

        return (
            <Row
                className={this.props.classes.row}
            >
                {headerCells}
            </Row>
        );
    }

    renderRows(visibleColumns: Array<Column>) {
        const dataSource = this.props.dataSource;
        const classes = this.props.classes;

        if (!dataSource || dataSource.length === 0) {
            const columnsCount = visibleColumns.length;
            return (
                <Row
                    className={classes.row}
                >
                    <Cell
                        colSpan={columnsCount}
                        className={classNames(classes.cell, classes.bodyCell)}
                    >
                        {i18n.t('No events to display')}
                    </Cell>
                </Row>
            );
        }

        return dataSource
            .map((row) => {
                const cells = visibleColumns
                    .map(column => (
                        <Cell
                            key={column.id}
                            className={classNames(classes.cell, classes.bodyCell)}
                        >
                            <div
                                style={
                                    OfflineEventsList.typesWithRightPlacement.includes(column.type) ?
                                        { textAlign: 'right' } :
                                        null
                                }
                            >
                                {row[column.id]}
                            </div>
                        </Cell>
                    ));

                return (
                    <Row
                        key={row.eventId}
                        className={classNames(classes.row, classes.dataRow)}
                        onClick={() => this.props.onRowClick(row)}
                    >
                        {cells}
                    </Row>
                );
            });
    }

    getPaginationLabelDisplayedRows =
        (fromToLabel: string, totalLabel: string) => `${fromToLabel} of ${totalLabel}`

    render() {
        const { dataSource, columns, classes } = this.props; //eslint-disable-line

        const visibleColumns = columns ?
            columns
                .filter(column => column.visible) : [];

        return (
            <div
                className={classes.container}
            >
                <div
                    className={classes.topBarContainer}
                />
                <div
                    className={classes.tableContainer}
                >
                    <Table
                        className={classes.table}
                    >
                        <Head>
                            {this.renderHeaderRow(visibleColumns)}
                        </Head>
                        <Body>
                            {this.renderRows(visibleColumns)}
                        </Body>
                    </Table>
                </div>
            </div>
        );
    }
}

/**
 * Create the offline event list for a event capture program
 * @namespace OfflineEventsList
 */
export default withStyles(styles)(OfflineEventsList);
