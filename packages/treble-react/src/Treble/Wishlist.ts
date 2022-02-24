import threekitAPI from '../api';
import connection from '../connection';
import { IConfigurationResponse } from '../http/configurations';
import { ISaveConfiguration } from '../api/configurations';
import { WISHLIST_LOCALSTORAGE_KEY } from '../constants';

export type WishlistArray = Array<IConfigurationResponse>;

let wishlistData: WishlistArray;

export interface IWishlist {
  getWishlist(): Promise<Array<IConfigurationResponse>>;
  addItem(
    config?: Omit<ISaveConfiguration, 'configurator'>
  ): Promise<Array<IConfigurationResponse>>;
  removeItemByIdx(idx: number): Array<IConfigurationResponse>;
  clearWishlist(): Array<IConfigurationResponse>;
}

class Wishlist implements IWishlist {
  _wishlistKey: string;

  constructor(orgId: string) {
    this._wishlistKey = `${WISHLIST_LOCALSTORAGE_KEY}_${orgId}`;
    this.getWishlist();
    return this;
  }

  getWishlist = async () => {
    if (wishlistData) return wishlistData;
    const { threekitDomain } = connection.getConnection();

    const wishlistListStr = localStorage.getItem(this._wishlistKey);
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]');

    const wishlistDataRaw = await Promise.all(
      wishlistList.map(el => threekitAPI.configurations.fetch(el))
    );

    wishlistData = wishlistDataRaw.map(el =>
      Object.assign(
        {},
        el.data,
        el.data.thumbnail?.length
          ? {
              thumbnail: `${threekitDomain}/api/files/hash/${el.data.thumbnail}`,
            }
          : undefined
      )
    );

    return wishlistData;
  };

  addItem = async (config?: Omit<ISaveConfiguration, 'configurator'>) => {
    if (!wishlistData) {
      wishlistData = [];
      localStorage.setItem(this._wishlistKey, JSON.stringify([]));
    }

    const configPrepped = Object.assign({ snapshot: true }, config);

    const savedConfiguration = await window.threekit.treble.saveConfiguration(
      configPrepped
    );
    if (!savedConfiguration) return wishlistData;

    wishlistData = [...wishlistData, savedConfiguration];
    const wishlistListStr = localStorage.getItem(this._wishlistKey);
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]');
    wishlistList.push(savedConfiguration.shortId);
    localStorage.setItem(this._wishlistKey, JSON.stringify(wishlistList));

    return this.getWishlist();
  };

  removeItemByIdx = (idx: number) => {
    if (!wishlistData?.length) {
      wishlistData = [];
      localStorage.setItem(this._wishlistKey, JSON.stringify([]));
      return wishlistData;
    }

    if (idx > wishlistData?.length - 1) return wishlistData;

    const updatedWishlist = [...wishlistData];
    updatedWishlist.splice(idx, 1);
    wishlistData = updatedWishlist;

    const wishlistListStr = localStorage.getItem(this._wishlistKey);
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]');
    wishlistList.splice(idx, 1);

    localStorage.setItem(this._wishlistKey, JSON.stringify(wishlistList));

    return wishlistData;
  };

  clearWishlist = () => {
    wishlistData = [];
    localStorage.setItem(this._wishlistKey, JSON.stringify([]));
    return wishlistData;
  };
}

export default function createWishlist(orgId: string) {
  return new Wishlist(orgId);
}
