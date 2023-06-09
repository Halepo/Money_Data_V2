import { createContext, useEffect, useState } from 'react';

export type useUI = {
  sidebarWidth: number;
  isSidebarExpanded: boolean;
  toggleSidebarExpanded: () => void;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  deviceType: 'tablet' | 'obile' | 'desktop';
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalContent: JSX.Element;
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  modalTitle: string;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const UIContext: any = createContext({});

const UIProvider = (props: any) => {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [modalTitle, setModalTitle] = useState('');
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setModalTitle('');
    }
  }, [isModalOpen, modalContent]);

  const toggleSidebarExpanded = () => {
    if (sidebarWidth == 240) {
      setSidebarWidth(88);
      setIsSidebarExpanded(false);
    } else {
      setSidebarWidth(240);
      setIsSidebarExpanded(true);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setDeviceType('mobile');
          setIsSidebarExpanded(false);
        } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
          setDeviceType('tablet');
          setIsSidebarExpanded(true);
        } else {
          setDeviceType('desktop');
          setIsSidebarExpanded(true);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const value: useUI = {
    sidebarWidth,
    isSidebarExpanded,
    toggleSidebarExpanded,
    setIsSidebarExpanded,
    deviceType,
    isModalOpen,
    setIsModalOpen,
    modalContent,
    setModalContent,
    modalTitle,
    setModalTitle,
  };

  return (
    <UIContext.Provider value={value}>{props.children}</UIContext.Provider>
  );
};

export default UIProvider;
