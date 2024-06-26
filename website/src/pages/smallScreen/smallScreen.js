import botConversaBrowser from '../../components/table/botConversaBrowser';
import './smallScreen.css';
import React from 'react';

export default function SmallScreenPanel() {
  return (
    <div id="small-screen-component">
      <botConversaBrowser
        demo={true}
        initialMessages={[
          {text: 'What is botconversa Chat?', role: 'user'},
          {text: 'A framework agnostic chat component.', role: 'ai'},
          {text: 'What exactly can it be used for?', role: 'user'},
          {text: 'Add it to your website to connect to AI APIs.', role: 'ai'},
        ]}
        style={{
          borderRadius: '10px',
          boxShadow: '0 .5rem 1rem 0 rgba(44, 51, 73, .1)',
          border: '1px solid #ededed',
          zIndex: 10,
        }}
        stream="true"
      ></botConversaBrowser>
    </div>
  );
}
