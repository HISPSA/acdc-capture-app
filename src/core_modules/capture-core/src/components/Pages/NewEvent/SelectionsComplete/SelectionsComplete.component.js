// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DataEntryWrapper from '../DataEntryWrapper/NewEventDataEntryWrapper.container';
import NewRelationshipWrapper from '../NewRelationshipWrapper/NewEventNewRelationshipWrapper.container';


const getStyles = (theme: Theme) => ({
    container: {
        padding: '10px 24px 24px 24px',
    },
});

type Props = {
    showAddRelationship: boolean,
    classes: {
        container: string,
    },
};

type State = {
    discardWarningOpen: boolean,
}

class SelectionsComplete extends Component<Props, State> {
    cancelButtonInstance: ?any;

    constructor(props: Props) {
        super(props);
        this.state = { discardWarningOpen: false };
    }
    render() {
        const { classes, showAddRelationship } = this.props;
        return (
            <div
                className={classes.container}
            >
                {showAddRelationship ?
                    <NewRelationshipWrapper /> :
                    <DataEntryWrapper />
                }
            </div>
        );
    }
}

export default withStyles(getStyles)(SelectionsComplete);
