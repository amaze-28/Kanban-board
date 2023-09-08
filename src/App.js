import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Ticket from './components/Ticket';
import axios from 'axios';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaCheckCircle, FaSpinner, FaListAlt } from 'react-icons/fa';
import { BsExclamationSquareFill } from 'react-icons/bs';
import { MdSignalCellular1Bar, MdSignalCellular2Bar, MdSignalCellular3Bar } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';


function App() {
  const [groupBy, setGroupBy] = useState('status');
  const [orderBy, setOrderBy] = useState('priority');
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});
  const [groupKeyCounts, setGroupKeyCounts] = useState({});

  

  const groupTicketsBy = (tickets, groupBy) => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const groupKey = ticket[groupBy];

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      
      grouped[groupKey].push(ticket);
    });

    return grouped;
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        'https://api.quicksell.co/v1/internal/frontend-assignment'
      );
      setTickets(response.data.tickets);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const groupedData = groupTicketsBy(tickets, groupBy);
    setGroupedTickets(groupedData);

    // counts for each groupKey
    const counts = {};
    for (const key in groupedData) {
      counts[key] = groupedData[key].length;
    }
    setGroupKeyCounts(counts);
  }, [groupBy, tickets]);

  // sorting tickets by priority or title
  const sortTickets = (groupedData) => {
    for (const key in groupedData) {
      if (orderBy === 'priority') {
        groupedData[key].sort((a, b) => b.priority - a.priority);
      } else if (orderBy === 'title') {
        groupedData[key].sort((a, b) => a.title.localeCompare(b.title));
      }
    }
    return groupedData;
  };

  const sortedGroupedTickets = sortTickets(groupedTickets);

  const groupKeyLabels = {
    0: 'No priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
  };

  const groupKeyIcons = {
    'Todo': <FaCheckCircle size={20}/>,
    'In progress': <FaSpinner size={20}/>,
    'Backlog': <FaListAlt size={20}/>,
    '0': <BiDotsHorizontalRounded size={20} />,
    '1': <MdSignalCellular1Bar size={20} />,
    '2': <MdSignalCellular2Bar size={20} />,
    '3': <MdSignalCellular3Bar size={20} />,
    '4': <BsExclamationSquareFill size={20} />,
    'usr-1': <RxAvatar size={20} />,
    'usr-2': <RxAvatar size={20} />,
    'usr-3': <RxAvatar size={20} />,
    'usr-4': <RxAvatar size={20} />,
    'usr-5': <RxAvatar size={20} />,
    'usr-6': <RxAvatar size={20} />,

  }

  return (
    <div>
      <Navbar
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <div className='ticket-container'>
        {Object.keys(sortedGroupedTickets).map((groupKey) => (
          <div key={groupKey} className='column'>
            <div className='ordering'>
            <div className='column-name'>
              <div className='column-name-sub1'>
                
                {groupKeyIcons.hasOwnProperty(groupKey) && <h2 style={{marginRight: "4px", }}>{groupKeyIcons[groupKey]}
</h2>}
                <h2 className='column-name-sub1-h2'>
                  {groupKeyLabels.hasOwnProperty(groupKey) ? groupKeyLabels[groupKey] : groupKey}
                </h2>
                <span>{groupKeyCounts[groupKey]}</span>
              </div>
              <div className='column-name-sub2'>
                <AiOutlinePlus className='column-icons' />
                <BiDotsHorizontalRounded className='column-icons' />
              </div>
            </div>
            {sortedGroupedTickets[groupKey].map((ticket) => (
              <Ticket
                key={ticket.id}
                id={ticket.id}
                title={ticket.title}
                tag={ticket.tag}
                userId={ticket.userId}
                status={ticket.status}
                priority={ticket.priority}
              />
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
