import React, { useState, useEffect } from 'react';
import './styles.css';
import { GetGroupsResponse, Group } from '../../types/types';
import mockData from '../../mockGroups.json';
import { Header, PanelHeader, SimpleCell, Group as VKUIGroup } from '@vkontakte/vkui';
import { Icon28HandSlashOutline, Icon28GestureOutline, Icon28Hand } from '@vkontakte/icons';
import GroupCard from '../GroupCard';

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

  return (
    <div className="App">
      <PanelHeader>VK test</PanelHeader>
      <VKUIGroup header={<Header mode="primary">Groups</Header>}>
        <SimpleCell className="findGroups" hasHover={true} hoverClassName="custom-hover-class" onClick={() => handleFilter('all')}  before={<Icon28GestureOutline />}>All Groups</SimpleCell>
        <SimpleCell className="findGroups" hasHover={true} hoverClassName="custom-hover-class" onClick={() => handleFilter('closed')} before={<Icon28HandSlashOutline />}>Closed Groups</SimpleCell> 
        <SimpleCell className="findGroups" hasHover={true} hoverClassName="custom-hover-class" onClick={() => handleFilter('open')} before={<Icon28Hand />}>Open Groups</SimpleCell>
      </VKUIGroup>  
      <div>
        {filteredGroups.map((group) => (
          <GroupCard group={group} groups={groups} setGroups={setGroups} />
        ))}
      </div>
    </div>
  );
};

export default FindGroups;