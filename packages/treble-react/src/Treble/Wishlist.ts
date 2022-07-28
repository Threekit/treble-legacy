import threekitAPI from '../api';
// import connection from '../connection';
import { IConfigurationResponse } from '../http/configurations';
import { ISaveConfiguration } from '../api/configurations';
import { WISHLIST_LOCALSTORAGE_KEY } from '../constants';

export type WishlistArray = Array<IConfigurationResponse>;

export interface IWishlist {
  getWishlist(): Promise<Array<IConfigurationResponse>>;
  addItem(
    config?: Omit<ISaveConfiguration, 'configuration'>
  ): Promise<Array<IConfigurationResponse>>;
  removeItemByIdx(idx: number): Array<IConfigurationResponse>;
  clearWishlist(): Array<IConfigurationResponse>;
}

let wishlistData: WishlistArray;
let wishlistKey: string;

const getWishlist = async () => {
  if (wishlistData) return wishlistData;

  const wishlistListStr = localStorage.getItem(wishlistKey);
  const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]');

  const wishlistDataRaw = await Promise.all(
    wishlistList.map(el => threekitAPI.configurations.fetch(el))
  );

  wishlistData = wishlistDataRaw.map(el => el.data);
  return wishlistData;
};

const addItem = async () => {
  if (!wishlistData) {
    wishlistData = [];
    localStorage.setItem(wishlistKey, JSON.stringify([]));
  }

  const thumbnails = (await window.threekit.treble.takeSnapshots(undefined, {
    output: 'file',
    filename: 'thumbnail',
  })) as Array<File>;

  const savedConfiguration = await window.threekit.treble.saveConfiguration({
    attachments: { thumbnail: thumbnails[0] },
  });
  if (!savedConfiguration) return wishlistData;

  wishlistData = [...wishlistData, savedConfiguration];
  const wishlistListStr = localStorage.getItem(wishlistKey);
  const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]');
  wishlistList.push(savedConfiguration.shortId);
  localStorage.setItem(wishlistKey, JSON.stringify(wishlistList));

  return getWishlist();
};

const removeItemByIdx = (idx: number) => {
  if (!wishlistData?.length) {
    wishlistData = [];
    localStorage.setItem(wishlistKey, JSON.stringify([]));
    return wishlistData;
  }

  if (idx > wishlistData?.length - 1) return wishlistData;

  const updatedWishlist = [...wishlistData];
  updatedWishlist.splice(idx, 1);
  wishlistData = updatedWishlist;

  const wishlistListStr = localStorage.getItem(wishlistKey);
  const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]');
  wishlistList.splice(idx, 1);

  localStorage.setItem(wishlistKey, JSON.stringify(wishlistList));

  return wishlistData;
};

const clearWishlist = () => {
  wishlistData = [];
  localStorage.setItem(wishlistKey, JSON.stringify([]));
  return wishlistData;
};

export default function createWishlist(orgId: string) {
  wishlistKey = `${WISHLIST_LOCALSTORAGE_KEY}_${orgId}`;
  getWishlist();
  return {
    getWishlist,
    addItem,
    removeItemByIdx,
    clearWishlist,
  };
}
