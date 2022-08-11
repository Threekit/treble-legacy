import http from '../http';
import connection from '../connection';

export const saveFile = async (files: BlobPart | Array<BlobPart>) => {
  const { orgId } = connection.getConnection();
  const fd = new FormData();

  fd.append('orgId', orgId);
  fd.append(
    `files`,
    new Blob(Array.isArray(files) ? files : [files], {
      type: 'application/json',
    })
  );

  const { data } = await http.files.postFile(fd);
  return data;
};
