import React from 'react'
import StatusDot from '@codeday/topo/Atom/StatusDot';

export default function iconSwitch(param, size=3) {
  switch(param) {
    case "running": 
      return (
        <StatusDot size={size} online />
      )
      // return (
      //   <div>
      //     <svg className="text-green-500" viewBox="0 0 20 20" fill="currentColor">
      //       <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>
      //     </svg>
      //   </div>
      // )

    case "dead": 
      return (
        <StatusDot offline />
      )
      // return (
      //   <div>
      //     <svg className="text-red-500" viewBox="0 0 20 20" fill="currentColor">
      //       <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd"/>
      //     </svg>
      //   </div>
      // )

    case "pending": 
      return (
        <StatusDot away />
      )
      // return (
      //   <div>
      //     <svg className="text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
      //       <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd"/>
      //     </svg>
      //   </div>
      // )

    case "complete": 
      return (
        <div>
          <svg className="text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
      )

    case "lost": 
      return (
        <div>
          <svg className="text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
      )

    default: 
      return (
        <div>
          <span className="text-xs font-black">{param}</span>
        </div>
      )
  }
}