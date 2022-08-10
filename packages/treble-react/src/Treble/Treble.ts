import threekitAPI from '../api';
import connection from '../connection';
import { PRIVATE_APIS } from '../types';
import type {
  IThreekitPlayer,
  IThreekitPrivatePlayer,
  IConfiguration,
  ISetConfiguration,
  IThreekitPrivateConfigurator,
} from '../types';
import { TK_SAVED_CONFIG_PARAM_KEY, TREBLE_DEBUG } from '../constants';
import { getParams, objectToQueryStr } from '../utils';
import wishlistInit from './wishlist';
import type { IWishlist } from './wishlist';
import snapshots from './snapshots';
import type { ISaveConfiguration } from '../api/configurations';
import type { ICreateOrder } from '../api/orders';
import type { ICartItem } from '../http/orders';
import shortid from 'shortid';

interface ITreble {
  player: IThreekitPlayer;
  orgId: string;
  initialConfiguration: IConfiguration;
}

interface IEmailShareCredentials {
  to: string;
  from: string;
  templateId: string;
}

interface IOrder extends Omit<ICreateOrder, 'cart'> {
  cart?: Array<ICartItem>;
}

interface ISaveConfigurationObject
  extends Omit<ISaveConfiguration, 'configuraiton'> {
  saveSceneGraphState: boolean;
}

class Treble {
  _api: typeof threekitAPI;
  _player: IThreekitPrivatePlayer;
  wishlist: IWishlist;
  private _initialConfiguration: string;
  private _snapshots: typeof snapshots;
  takeSnapshots: typeof snapshots['takeSnapshots'];
  _debugMode: boolean;

  constructor({ player, orgId, initialConfiguration }: ITreble) {
    //  Threekit API
    this._api = threekitAPI;
    this.wishlist = wishlistInit(orgId);
    this._snapshots = snapshots;
    this.takeSnapshots = this._snapshots.takeSnapshots;
    this._player = player.enableApi(PRIVATE_APIS.PLAYER);
    this._initialConfiguration = JSON.stringify(initialConfiguration);
    this._debugMode = TREBLE_DEBUG;
  }

  createOrder = async (order?: IOrder) => {
    let updatedOrder: ICreateOrder = Object.assign(
      {},
      order,
      order?.cart ? { cart: order.cart } : { cart: [] }
    );

    if (!order?.cart) {
      const configuration = await this.saveConfiguration();
      updatedOrder = Object.assign(
        {},
        order,
        order?.cart?.length
          ? { cart: order.cart }
          : {
              cart: [
                {
                  count: 1,
                  configurationId: configuration.id,
                },
              ],
            }
      );
    }

    const response = await threekitAPI.orders.createOrder(updatedOrder);
    return response;
  };

  saveConfiguration = async (config?: Partial<ISaveConfigurationObject>) => {
    const { threekitDomain } = connection.getConnection();
    const {
      customerId,
      metadata,
      productVersion,
      attachments,
      saveSceneGraphState,
    } = Object.assign({}, config);

    const player = window.threekit.player.enableApi(PRIVATE_APIS.PLAYER);
    let sceneGraphState: string | undefined;

    if (saveSceneGraphState && player.saveSceneGraphState) {
      const sceneGraphResponse = await threekitAPI.files.saveFile(
        player.saveSceneGraphState()
      );
      sceneGraphState = sceneGraphResponse.files[0].id;
    }

    const response = await threekitAPI.configurations.save({
      shortId: shortid.generate(),
      assetId: window.threekit.player.assetId,
      configuration: player.getConfigurator().getFullConfiguration(),
      customerId,
      metadata,
      productVersion,
      attachments,
      sceneGraphState,
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

  getNestedConfigurator = (
    address: string | Array<string>
  ): undefined | IThreekitPrivateConfigurator => {
    if (!address) return undefined;
    const player = window.threekit.player.enableApi(PRIVATE_APIS.PLAYER);
    const addressArr = Array.isArray(address) ? address : [address];
    return addressArr.reduce((configurator, attributeName) => {
      if (!configurator) return undefined;
      const itemId = configurator.getAppliedConfiguration(attributeName);
      return window.threekit.player.scene.get({
        id: itemId,
        evalNode: true,
      })?.configurator;
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

  sendEmail = (
    credentials: IEmailShareCredentials,
    templateData: Record<string, any>
  ) => {
    if (!credentials)
      throw new Error('sendEmail is missing credentials object');
    if (!credentials.from.length)
      throw new Error('sendEmail is missing sender email - "From"');
    if (!credentials.to.length)
      throw new Error('sendEmail is missing receivers email - "To"');
    if (!credentials.templateId.length)
      throw new Error(
        'sendEmail is missing the templateId to use - "TemplateId"'
      );
    const data = Object.assign(
      {
        To: credentials.to,
        From: credentials.from,
        TemplateId: credentials.templateId,
      },
      { TemplateModel: templateData }
    );
    return threekitAPI.server.sendEmail(data);
  };
}

export default Treble;
