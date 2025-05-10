import React from 'react'

import { Board } from '@/components/ui';
import TeamRow from './TeamRow';

export default function Teamboard({ children, title}) {

  return (
    <Board title={title}>
      <ul className="divide-y divide-gray-200">
        {children}        
      </ul>
    </Board>
  );
}

