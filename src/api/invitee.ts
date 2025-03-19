import api from "@/config/axios";
import axios from "axios";

export interface InviteeData {
  name: string;
  phone: string;
  email: string;
  additionalInvitees: number;
  observation: string;
  giftListId: string;
  status: 'REJECTED' | 'ACCEPTED';
}

export interface UpdateInviteeData {
  name?: string;
  phone?: string;
  email?: string;
  additionalInvitees?: number;
  observation?: string;
  giftListId?: string;
  status?: 'REJECTED' | 'ACCEPTED';
}

export const createInvitee = async (data: InviteeData) => {
  return axios.post('http://localhost:8000/api/v1/invitees', data);
}

export const getAllInviteesByGiftListSlug = async (slug: string) => {
  const response = await api.get(`/invitees/${slug}/all`);

  return response.data;
};

export const getAllInviteesWithPaginationByGiftListSlug = async (slug: string, page: number, limit: number, search: string, status: string = '') => {
  console.log("buscando invitees", slug, page, limit, search, status);
  switch (status) {
    case 'Todos':
      status = '';
      break;
    case 'Aceito':
      status = 'ACCEPTED';
      break;
    case 'Recusado':
      status = 'REJECTED';
      break;
    default:
      status = '';
      break;
  }

  const response = await api.get(`/invitees/${slug}`, {
    params: { page, limit, search, status }
  });
  return response.data;
};

export const updateInvitee = async ({ slug, id, data }: { slug: string; id: string; data: UpdateInviteeData }) => {
  return api.put(`/invitees/${slug}/${id}`, data);
};

export const deleteInvitee = async ({ slug, id }: { slug: string; id: string }) => {
  console.log("apagando invitee", slug, id);
  return api.delete(`/invitees/${slug}/${id}`);
};