import http from '../http';
import { IPostEmailRequest } from '../http/server';

export const sendEmail = (data: IPostEmailRequest) =>
  http.server.postEmail(data);
