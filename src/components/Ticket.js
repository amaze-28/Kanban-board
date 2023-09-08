import React, { useState } from 'react';
import '../index';
import '../styles/Ticket.css';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const Card = (props) => {
  const { id, title, tag, userId, status, priority, groupBy } = props;

  return (
    <>
      <div className="task-card">
        <div className="task-card-header">
          <div className="task-card-id">{id}</div>
          <div className="task-card-user-icon">User Icon</div>
        </div>
        <div className="task-card-title">{title}</div>
        <div className='task-card-tagged'>
        <BiDotsHorizontalRounded />
        <div className="task-card-tag">{tag}</div>
        </div>
      </div>
    </>
  );
};

export default Card;
