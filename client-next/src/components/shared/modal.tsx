import {
  UilCheckCircle,
  UilMultiply,
  UilTimesCircle,
} from '@iconscout/react-unicons';
import React from 'react';
import './modal.module.sass';

import CustomButton from './customButton';
import useUI from '../../lib/hooks/useUI';

export let toggleModalVisible: any;

export default function Modal({ content, title }: any) {
  const { isModalOpen, setIsModalOpen, setModalContent } = useUI();

  const { deviceTypeByWidth } = useUI();
  let modalMinWidth = '50%';

  if (deviceTypeByWidth == 'mobile') modalMinWidth = '100%';
  if (deviceTypeByWidth == 'tablet') modalMinWidth = '75%';
  if (deviceTypeByWidth == 'desktop') modalMinWidth = '50%';

  return (
    <div>
      <div
        className='modal-zee right'
        id='custom-modal-right'
        tabIndex={-1}
        style={{ display: isModalOpen ? 'block' : 'none' }}
      >
        <div className='modal-dialog-zee' style={{ minWidth: modalMinWidth }}>
          <div className='modal-content-zee'>
            <div className='modal-header-zee'>
              <h1 className='modal-title-zee fs-5' id='modal-title-zee'>
                {title ? title : 'Dialog'}
              </h1>
              <button
                type='button'
                className='modal-close-button-zee btn-close'
                aria-label='Close'
                onClick={() => {
                  setIsModalOpen(false);
                  setModalContent(<></>);
                }}
              >
                <UilMultiply />
              </button>
            </div>

            <div className='modal-body-zee'>{content}</div>

            <div className='modal-footer-zee'>
              {/* //TODO get modal footer action buttons from props */}
              <CustomButton
                type='button'
                className='btn btn-primary'
                style={{
                  color: 'green',
                  fontWight: 'bold',
                  minWidth: '10rem',
                }}
              >
                <UilCheckCircle style={{ marginRight: '.5rem' }} /> Save changes
              </CustomButton>
              <CustomButton
                style={{
                  color: 'red',
                  fontWight: 'bold',
                  minWidth: '10rem',
                }}
                type='button'
                className='btn btn-secondary'
                onClick={() => {
                  setIsModalOpen(false);
                  setModalContent(<></>);
                }}
              >
                <UilTimesCircle style={{ marginRight: '.5rem' }} /> Close
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <div
          onClick={() => {
            console.log('closing...');
            setIsModalOpen(false);
            setModalContent(<></>);
          }}
          className='modal-backdrop-zee show'
        ></div>
      ) : (
        ''
      )}
    </div>
  );
}
