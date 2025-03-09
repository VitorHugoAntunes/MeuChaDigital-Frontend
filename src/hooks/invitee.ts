import { useMutation } from '@tanstack/react-query';
import { createInvitee, InviteeData } from '@/api/invitee';

export const useCreateInvitee = () => {
  return useMutation({
    mutationFn: (data: InviteeData) => createInvitee(data),
  });
};
