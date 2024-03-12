import React, { useState, useEffect } from 'react';
import './styles.css';
import { GetGroupsResponse, Group } from '../../types/types';
import mockData from '../../mockGroups.json';
import { Header, PanelHeader, SimpleCell, Group as VKUIGroup } from '@vkontakte/vkui';
import { Icon28HandSlashOutline, Icon28GestureOutline, Icon28Hand } from '@vkontakte/icons';
const mockFetch = async (): Promise<GetGroupsResponse> => {
  // Задержка в 1 секунду
  await new Promise(resolve => setTimeout(resolve, 1000));
  //замоканные данные из файла groups.json
  const mock: GetGroupsResponse = {
    result: 1,
    data: mockData,
  };

  return mock;
};

const FindGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mockFetch();
        // Обработка успешного ответа
        if (result.result == 1 && result.data) {
          setGroups(result.data);
          setFilteredGroups(result.data);
        } else {
          console.error('Error fetching groups data');
        }
      } catch (error) {
        if(error instanceof Error){
          console.log('Ошибка получения данных', error.message);
        } 
      }
    };

    fetchData();
  }, []);

  const handleFilter = (type: string) => {
    let filtered: Group[] = groups;

    if (type === 'closed') {
      filtered = groups.filter((group) => group.closed);
    } else if (type === 'open') {
      filtered = groups.filter((group) => !group.closed);
    }

    setFilteredGroups(filtered);
  };

  const handleShowFriends = (groupId: number) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        group.showFriends = !group.showFriends;
      }
      return group;
    });

    setGroups(updatedGroups);
  };

  return (
    <div className="App">
      {/* <div> */}
      <PanelHeader>VK test</PanelHeader>
      <VKUIGroup header={<Header mode="primary">Groups</Header>}>
        <SimpleCell className="findGroups" hasHover={true} hoverClassName="custom-hover-class" onClick={() => handleFilter('all')}  before={<Icon28GestureOutline />}>All Groups</SimpleCell>
        <SimpleCell className="findGroups" hasHover={true} hoverClassName="custom-hover-class" onClick={() => handleFilter('closed')} before={<Icon28HandSlashOutline />}>Closed Groups</SimpleCell> 
        <SimpleCell className="findGroups" hasHover={true} hoverClassName="custom-hover-class" onClick={() => handleFilter('open')} before={<Icon28Hand />}>Open Groups</SimpleCell>
      </VKUIGroup>  
      {/* </div> */}
      <div>
    
        {filteredGroups.map((group) => (
              <VKUIGroup>
          <div key={group.id} className="group">
            <div>
              <p>{group.name}</p>
              {group.avatar_color && (
                <div
                  className="avatar"
                  style={{ backgroundColor: group.avatar_color, width: '100px', height: '100px', borderRadius: '50%' }}
                ></div>
              )}
              {group.closed ? <p>Closed Group</p> : <p>Open Group</p>}
              <p>Members: {group.members_count}</p>
              {group.friends && (
                <button onClick={() => handleShowFriends(group.id)}>
                  {group.showFriends ? 'Hide Friends' : 'Show Friends'}
                </button>
              )}
            </div>
            {group.showFriends && group.friends && (
              <div className="friends">
                <p>Friends:</p>
                {group.friends.map((friend) => (
                  <p key={`${friend.first_name}_${friend.last_name}`}>{`${friend.first_name} ${friend.last_name}`}</p>
                ))}
              </div>
            )}
          </div>
          </VKUIGroup>
          ))}
          
       
      </div>
    </div>
  );
};

export default FindGroups;