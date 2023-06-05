import { createContext, useEffect, useState } from "react";

export type useUI = {
  sidebarWidth: number;
  isSidebarExpanded: boolean;
  toggleSidebarExpanded: () => void;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  deviceTypeByUserAgent: "tablet" | "mobile" | "desktop";
  deviceTypeByWidth: "tablet" | "mobile" | "desktop";
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalContent: JSX.Element;
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  modalTitle: string;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
};

// A function that returns the device type based on width
const getDeviceTypeByWidth = () => {
  const width = window.innerWidth;
  switch (true) {
    case width <= 768:
      return "mobile";
    case width > 768 && width <= 1024:
      return "tablet";
    case width > 1024:
      return "desktop";
    default:
      return "desktop";
  }
};

// A function that returns the device type based on user-agent
const getDeviceTypeByUserAgent = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire/i.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

export const UIContext: any = createContext({});

const UIProvider = (props: any) => {
  //TODO save this in user profiles (settings)
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setModalTitle("");
    }
  }, [modalContent]);

  const toggleSidebarExpanded = () => {
    if (sidebarWidth == 240) {
      setSidebarWidth(88);
      setIsSidebarExpanded(false);
    } else {
      setSidebarWidth(240);
      setIsSidebarExpanded(true);
    }
  };

  //handle updating the width (resize), not handled now.
  // const useWindowWide = () => {
  //   const [width, setWidth] = useState(0);

  //   useEffect(() => {
  //     function handleResize() {
  //       setWidth(window.innerWidth);
  //     }

  //     window.addEventListener('resize', handleResize);

  //     handleResize();

  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }, [setWidth]);

  //   return width;
  // };

  //set open or closed sidebar based on width
  useEffect(() => {
    if (getDeviceTypeByWidth() == "desktop") setIsSidebarExpanded(true);
    else if (getDeviceTypeByWidth() == "tablet" && isSidebarExpanded == true)
      toggleSidebarExpanded();
    else if (getDeviceTypeByWidth() == "mobile" && isSidebarExpanded == true)
      toggleSidebarExpanded();
  }, [window.innerWidth]);

  const value: useUI = {
    sidebarWidth,
    isSidebarExpanded,
    toggleSidebarExpanded,
    setIsSidebarExpanded,
    deviceTypeByUserAgent: getDeviceTypeByUserAgent(),
    deviceTypeByWidth: getDeviceTypeByWidth(),
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
