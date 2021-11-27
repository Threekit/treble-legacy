import threekitAPI from '../api'
import connection from '../connection'
import { IConfigurationResponse } from '../http/configurations'
import { ISaveConfigurationConfig } from './Treble'
import { WISHLIST_LOCALSTORAGE_KEY } from '../constants'

export type WishlistArray = Array<IConfigurationResponse>

let wishlistData: WishlistArray

export interface IWishlist {
  getWishlist(): Promise<Array<IConfigurationResponse>>
  addItem(
    config?: ISaveConfigurationConfig
  ): Promise<Array<IConfigurationResponse>>
  removeItemByIdx(idx: number): Array<IConfigurationResponse>
  clearWishlist(): Array<IConfigurationResponse>
}

class Wishlist implements IWishlist {
  constructor() {
    this.getWishlist()
  }

  getWishlist = async () => {
    if (wishlistData) return wishlistData
    const { threekitDomain } = connection.getConnection()

    const wishlistListStr = localStorage.getItem(WISHLIST_LOCALSTORAGE_KEY)
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]')

    const wishlistDataRaw = await Promise.all(
      wishlistList.map((el) => threekitAPI.configurations.fetch(el))
    )

    wishlistData = wishlistDataRaw.map((el) =>
      Object.assign(
        {},
        el.data,
        el.data.thumbnail?.length
          ? {
              thumbnail: `${threekitDomain}/api/files/hash/${el.data.thumbnail}`,
            }
          : undefined
      )
    )

    return wishlistData
  }

  addItem = async (config?: ISaveConfigurationConfig) => {
    if (!wishlistData) {
      wishlistData = []
      localStorage.setItem(WISHLIST_LOCALSTORAGE_KEY, JSON.stringify([]))
    }

    const configPrepped = Object.assign({ snapshot: true }, config)

    const savedConfiguration = await window.threekit.treble.saveConfiguration(
      configPrepped
    )
    // const savedConfiguration = await this.saveConfiguration(configPrepped)
    if (!savedConfiguration) return wishlistData

    wishlistData = [...wishlistData, savedConfiguration]
    const wishlistListStr = localStorage.getItem(WISHLIST_LOCALSTORAGE_KEY)
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]')
    wishlistList.push(savedConfiguration.shortId)
    localStorage.setItem(
      WISHLIST_LOCALSTORAGE_KEY,
      JSON.stringify(wishlistList)
    )

    return this.getWishlist()
  }

  removeItemByIdx = (idx: number) => {
    if (!wishlistData?.length) {
      wishlistData = []
      localStorage.setItem(WISHLIST_LOCALSTORAGE_KEY, JSON.stringify([]))
      return wishlistData
    }

    if (idx > wishlistData?.length - 1) return wishlistData

    const updatedWishlist = [...wishlistData]
    updatedWishlist.splice(idx, 1)
    wishlistData = updatedWishlist

    const wishlistListStr = localStorage.getItem(WISHLIST_LOCALSTORAGE_KEY)
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]')
    wishlistList.splice(idx, 1)

    localStorage.setItem(
      WISHLIST_LOCALSTORAGE_KEY,
      JSON.stringify(wishlistList)
    )

    return wishlistData
  }

  clearWishlist = () => {
    wishlistData = []
    localStorage.setItem(WISHLIST_LOCALSTORAGE_KEY, JSON.stringify([]))
    return wishlistData
  }
}

export default function createWishlist() {
  return new Wishlist()
}
