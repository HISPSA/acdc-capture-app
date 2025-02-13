// @flow
import type { WidgetEffects, HideWidgets } from '../../common/EnrollmentOverviewDomain';
import type { ExternalSaveHandler } from '../../../WidgetEnrollmentEventNew';

export type Props = {|
    programId: string,
    stageId: string,
    orgUnitId: string,
    teiId: string,
    enrollmentId: string,
    onSave: ExternalSaveHandler,
    dataEntryHasChanges: boolean,
    onCancel: () => void,
    onDelete: () => void,
    onAddNew: () => void,
    onEnrollmentError: (message: string) => void,
    onEnrollmentSuccess: () => void,
    widgetEffects: ?WidgetEffects,
    hideWidgets: HideWidgets,
    rulesExecutionDependencies: Object,
    pageFailure: boolean,
    ready: boolean,
    widgetReducerName: string,
    ...CssClasses,
|};

export type ContainerProps = {|
    enrollment: ?Object,
    attributeValues: ?Object,
    commonDataError: boolean,
|}
