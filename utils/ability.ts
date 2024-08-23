import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { AppAbility, User, RolesPermissions } from '../types/appAbility';

// Define abilities based on user role and permissions
export function defineAbilitiesFor(user: User, rolesData: RolesPermissions): AppAbility {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  const role = rolesData.role.find(r => r.name === user.role);
  if (role) {
    role.permissions.forEach(permission => {
      const action = permission.action as any;
      const resource = permission.resource as any;
      const conditions = permission.conditions || {};

      if (action === 'deny') {
        cannot(action, resource).because(JSON.stringify(conditions));
      } else {
        can(action, resource, conditions);
      }
    });
  }

  return build({
    detectSubjectType: (object) => object.type
  });
}
