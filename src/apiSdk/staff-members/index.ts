import axios from 'axios';
import { StaffMembersInterface } from 'interfaces/staff-members';

export const getStaffMembers = async () => {
  const response = await axios.get(`/api/staff-members`);
  return response.data;
};

export const createStaffMembers = async (staffMembers: StaffMembersInterface) => {
  const response = await axios.post('/api/staff-members', staffMembers);
  return response.data;
};

export const updateStaffMembersById = async (id: string, staffMembers: StaffMembersInterface) => {
  const response = await axios.put(`/api/staff-members/${id}`, staffMembers);
  return response.data;
};

export const getStaffMembersById = async (id: string) => {
  const response = await axios.get(`/api/staff-members/${id}`);
  return response.data;
};
