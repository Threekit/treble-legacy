import axios from 'axios';
import connection from '../connection';

export interface IPostEmailRequest {
  From: string;
  To: string;
  TemplateId: string;
  TemplateModel: Record<string, any>;
}

export interface IPostEmailResponse {
  To: string;
  SubmittedAt: string;
  MessageID: string;
  ErrorCode: 0;
  Message: string;
}

export const postEmail = (data: IPostEmailRequest) => {
  if (!data) throw new Error('data missing');
  const { serverUrl } = connection.getConnection();
  if (!serverUrl) throw new Error('missing server-url');
  return axios.post<IPostEmailRequest, IPostEmailResponse>(
    `${serverUrl}/api/email`,
    data
  );
};
