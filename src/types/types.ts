export interface GetGroupsResponse {
  result?: 1 | 0,
  data?: Group[]
}

export interface Group {
  id: number,
  name: string,
  closed: boolean,
  avatar_color?: string,
  members_count: number,
  friends?: User[],
  showFriends?: boolean;
}

export interface User {
  first_name: string,
  last_name: string
}

export interface Card {
  groups: Group[],
  group: Group,
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>
 }