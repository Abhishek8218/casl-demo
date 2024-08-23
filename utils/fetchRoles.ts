import { RolesPermissions } from '../types/appAbility';

export async function fetchRolesAndPermissions(): Promise<RolesPermissions> {
  const response = await fetch('/rolesPermissions.json');
  const data: RolesPermissions = await response.json();
  return data;
}
