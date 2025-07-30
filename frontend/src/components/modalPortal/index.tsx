import { createPortal } from 'react-dom';

import React from 'react';

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (typeof window === 'undefined') return null;
  return createPortal(children, document.body);
};

export { ModalPortal };
