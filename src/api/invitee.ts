import axios from 'axios';

export interface InviteeData {
  name: string;
  phone: string;
  email: string;
  additionalInvitees: number;
  observation: string;
  giftListId: string;
  status: 'REJECTED' | 'ACCEPTED';
}

export const createInvitee = async (data: InviteeData) => {
  return axios.post('http://localhost:8000/api/v1/invitees', data);
}