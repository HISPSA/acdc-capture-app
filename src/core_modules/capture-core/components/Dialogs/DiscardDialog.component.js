// @flow
import React from 'react';
import { Modal, ModalTitle, ModalContent, ModalActions, ButtonStrip, Button } from '@dhis2/ui';
import type { Props } from './discardDialog.types';

export const DiscardDialog = ({
    open, header, text, cancelText, onCancel, destructiveText, onDestroy,
}: Props) => (
    <Modal hide={!open} onClose={onCancel} small>
        <ModalTitle>
            {header}
        </ModalTitle>
        <ModalContent>
            {text}
        </ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button onClick={onCancel} secondary>
                    {cancelText}
                </Button>
                <Button onClick={onDestroy} destructive>
                    {destructiveText}
                </Button>
            </ButtonStrip>
        </ModalActions>
    </Modal>
);

