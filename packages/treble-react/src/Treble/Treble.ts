import threekitAPI from '../api';
import connection from '../connection';
import {
  IThreekitPlayer,
  IConfiguration,
  ISetConfiguration,
} from '../threekit';
import { TK_SAVED_CONFIG_PARAM_KEY } from '../constants';
import { getParams, objectToQueryStr } from '../utils';
import createWishlist, { IWishlist } from './Wishlist';
import Snapshots from './Snapshots';
import { ISaveConfiguration } from '../api/configurations';

interface ITreble {
  player: IThreekitPlayer;
  orgId: string;
  initialConfiguration: IConfiguration;
}

class Treble {
  _api: typeof threekitAPI;
  _player: IThreekitPlayer;
  wishlist: IWishlist;
  private _initialConfiguration: string;
  private _snapshots: Snapshots;
  takeSnapshots: Snapshots['takeSnapshots'];

  constructor({ player, orgId, initialConfiguration }: ITreble) {
    //  Threekit API
    this._api = threekitAPI;
    this._player = player;
    this.wishlist = createWishlist(orgId);
    this._snapshots = new Snapshots();
    this.takeSnapshots = this._snapshots.takeSnapshots;
    // this._player = player.enableApi('player');
    this._initialConfiguration = JSON.stringify(initialConfiguration);
  }

  saveConfiguration = async (
    config?: Omit<ISaveConfiguration, 'configuration'>
  ) => {
    const { threekitDomain } = connection.getConnection();
    const { customerId, metadata, productVersion, attachments } = Object.assign(
      {},
      config
    );

    const response = await threekitAPI.configurations.save({
      assetId: window.threekit.player.assetId,
      configuration: window.threekit.configurator.getConfiguration(),
      customerId,
      metadata,
      productVersion,
      attachments,
    });

    const params = Object.assign(getParams(), {
      [TK_SAVED_CONFIG_PARAM_KEY]: response.data.shortId,
    });
    const url = window.location.href.replace(window.location.search, '');

    return Object.assign(
      {
        resumableUrl: `${url}${objectToQueryStr(params)}`,
      },
      response.data,
      response.data.thumbnail?.length
        ? {
            thumbnail: `${threekitDomain}/api/files/hash/${response.data.thumbnail}`,
          }
        : undefined
    );
  };

  getNestedConfigurator = (address: string | Array<string>) => {
    const player = window.threekit.player.enableApi('player');
    const addressArr = Array.isArray(address) ? address : [address];
    return addressArr.reduce((configurator, attributeName) => {
      const itemId = configurator.getAppliedConfiguration(attributeName);
      return window.threekit.player.scene.get({
        id: itemId,
        evalNode: true,
      }).configurator;
    }, player.getConfigurator());
  };

  resetConfiguration = (configuration?: ISetConfiguration) => {
    const initialConfiguration: IConfiguration = JSON.parse(
      this._initialConfiguration
    );
    const updateConfiguration = Object.assign(
      initialConfiguration,
      configuration
    );
    window.threekit.configurator.setConfiguration(updateConfiguration);
  };
}

export default Treble;
