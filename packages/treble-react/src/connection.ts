export interface IConnectionConfig {
  authToken?: string;
  orgId?: string;
  assetId?: string;
  threekitDomain?: string;
  serverUrl?: string;
}

export class ThreekitConnection {
  _authToken: string;
  _orgId: string;
  _assetId: string;
  _threekitDomain: string;
  _serverUrl: string;

  constructor() {
    this._authToken = '';
    this._orgId = '';
    this._assetId = '';
    this._serverUrl = '';
    this._threekitDomain = 'https://admin-fts.threekit.com';
  }

  async connect(config: IConnectionConfig) {
    if (config.authToken) this._authToken = config.authToken;
    if (config.orgId) this._orgId = config.orgId;
    if (config.assetId) this._assetId = config.assetId;
    if (config.serverUrl) this._serverUrl = config.serverUrl;
    if (config.threekitDomain)
      this._threekitDomain = `https://${config.threekitDomain}`;
  }

  getConnection() {
    if (!this._authToken?.length)
      throw new Error('Connection has not been established');
    return {
      authToken: this._authToken,
      orgId: this._orgId,
      assetId: this._assetId,
      threekitDomain: this._threekitDomain,
      serverUrl: this._serverUrl,
    };
  }
}

export default new ThreekitConnection();
