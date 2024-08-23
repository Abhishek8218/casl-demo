'use client'

import { useAbility } from "@/context/AbilityProvider";

const roles = ['superAdmin', 'admin', 'teamLead', 'user'];

export default function PermissionsComponent() {
 const ability = useAbility();

  if (!ability) {
    return <div className="text-center py-10">Loading permissions...</div>;
  }

  console.log(ability);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Role: </h2>
      <div className="mb-6">
        <label htmlFor="roleSelect" className="block text-sm font-medium text-gray-600">Select Role:</label>
        {/* <select
          id="roleSelect"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full px-3 py-2  text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {roles.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select> */}
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Document Resource</h3>
          <p className={`mt-2 ${ability.can('read', 'Document') ? 'text-green-600' : 'text-red-600'}`}>
            {ability.can('read', 'Document') ? 'You can read documents' : 'You cannot read documents'}
          </p>
          <p className={`mt-2 ${ability.can('update', 'Document') ? 'text-green-600' : 'text-red-600'}`}>
            {ability.can('update', 'Document') ? 'You can update documents' : 'You cannot update documents'}
          </p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Article Resource</h3>
          <p className={`mt-2 ${ability.can('update', 'Article') ? 'text-green-600' : 'text-red-600'}`}>
            {ability.can('update', 'Article') ? 'You can update articles' : 'You cannot update articles'}
          </p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Project Resource</h3>
          <p className={`mt-2 ${ability.can('create', 'Project') ? 'text-green-600' : 'text-red-600'}`}>
            {ability.can('create', 'Project') ? 'You can create projects' : 'You cannot create projects'}
          </p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Comment Resource</h3>
          <p className={`mt-2 ${ability.can('delete', 'Comment') ? 'text-green-600' : 'text-red-600'}`}>
            {ability.can('delete', 'Comment') ? 'You can delete comments' : 'You cannot delete comments'}
          </p>
        </div>
      </div>
    </div>
  );
}
