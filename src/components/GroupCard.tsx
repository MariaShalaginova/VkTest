import { Group as VKUIGroup } from '@vkontakte/vkui';
import { Card } from '../types/types';

const GroupCard = (props: Card) => {
  const {group, groups, setGroups} = props;

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
  )
}
export default GroupCard