import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { AppAbility, User, RolesPermissions } from '../types/appAbility';

// Define abilities based on user role and permissions
export function defineAbilitiesFor(user: User, rolesData: RolesPermissions): AppAbility {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  // Find the role of the current user
  const role = rolesData.role.find(r => r.name === user.role);
  if (role) {
    role.permissions.forEach(permission => {
      // Apply user attributes to the conditions
      // Since conditional access is removed, we just pass action and resource
      const action = permission.action as any;
      const resource = permission.resource as any;

      // Use `can` or `cannot` based on the action and resource
      if (action === 'deny') {
        cannot(action, resource);
      } else {
        can(action, resource);
      }
    });
  }

  return build({
    detectSubjectType: (object) => object.type // Define the subject type based on object
  });
}
