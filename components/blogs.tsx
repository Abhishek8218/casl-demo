"use client"

import { useAbility } from '../context/AbilityProvider';
import { useState } from 'react';

export const MyForm = () => {
  const ability = useAbility();
  const [formData, setFormData] = useState({
    department: '',
    category: '',
    projectName: '',
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };


const articles = [
    {
        id: 'article1',
        title: 'Article 1',
        userID: 'user2123',
    },
    {
        id: 'article2',
        title: 'Article 2',
        userID: 'user2124',
    },
    {
        id: 'article3',
        title: 'Article 3',
        userID: 'user2123',
    }
]


  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Form Title</h2>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="department" className="text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            id="department"
            name="department"
            type="text"
            value={formData.department}
            onChange={handleChange}
            disabled={!ability.can('create', { type: 'Document', department: 'Art' })}
            className="mt-1 p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            disabled={!ability.can('update', { type: 'Article', userID: 'user2123' })}
            className="mt-1 p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="projectName" className="text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            id="projectName"
            name="projectName"
            type="text"
            value={formData.projectName}
            onChange={handleChange}
            disabled={!ability.can('manage', { type: 'Project' })}
            className="mt-1 p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="comment" className="text-sm font-medium text-gray-700">
            Comment
          </label>
          <input
            id="comment"
            name="comment"
            type="text"
            value={formData.comment}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>

{articles.map(article => (
    <div key={article.id} className="flex flex-col">
        <p className="text-sm font-medium text-gray-700">
            {article.title}
        </p>
        <button className='text-black '>
            {ability.can('update', { type: 'Article', userID: article.userID }) ? 'Update' : 'Cannot Update'}
        </button>
       
    </div>
))}


      </form>
    </div>
  );
};
