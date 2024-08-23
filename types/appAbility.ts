import { Abilities, MongoQuery, PureAbility } from '@casl/ability';

export type AppAbility = PureAbility<Abilities, MongoQuery>;

export interface User {
  role: string;
}
export interface RolesPermissions {
  role: {
    name: string;
    permissions: {
      action: string;
      resource: string;
      conditions?: Record<string, any>; // Add conditions for attributes
    }[];
  }[];
  resources: {
    type: string;
    attributes: string[];
  }[];
  actions: string[];
}

