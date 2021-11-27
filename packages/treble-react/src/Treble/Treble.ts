import threekitAPI from '../api'
import connection from '../connection'
import { IThreekitPlayer, IMetadata } from '../threekit'
import { TK_SAVED_CONFIG_PARAM_KEY } from '../constants'
import { getParams, objectToQueryStr } from '../utils'
import Wishlist, { IWishlist } from './Wishlist'
import Snapshots from './Snapshots'

interface ITreble {
  player: IThreekitPlayer
}

export interface ISaveConfigurationConfig {
  customerId?: string
  metadata?: IMetadata
  productVersion?: string
}

class Treble {
  _api: typeof threekitAPI
  _player: IThreekitPlayer
  wishlist: IWishlist
  private _snapshots: Snapshots
  takeSnapshots: Snapshots['takeSnapshots']

  constructor({ player }: ITreble) {
    //  Threekit API
    this._api = threekitAPI
    this._player = player
    this.wishlist = Wishlist()
    this._snapshots = new Snapshots()
    this.takeSnapshots = this._snapshots.takeSnapshots
    // this._player = player.enableApi('player')
  }

  saveConfiguration = async (config?: ISaveConfigurationConfig) => {
    const { threekitDomain } = connection.getConnection()
    const { customerId, metadata, productVersion } = Object.assign({}, config)

    let files: File | undefined = undefined

    const response = await threekitAPI.configurations.save({
      assetId: window.threekit.player.assetId,
      configuration: window.threekit.configurator.getConfiguration(),
      customerId,
      metadata,
      productVersion,
      files,
    })

    const params = Object.assign(getParams(), {
      [TK_SAVED_CONFIG_PARAM_KEY]: response.data.shortId,
    })
    const url = window.location.href.replace(window.location.search, '')

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
    )
  }
}

export default Treble
