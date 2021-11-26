import threekitAPI from '../api'
import connection from '../connection'
import { IConfigurationResponse } from '../http/configurations'
import { ISaveConfigurationConfig } from './Treble'
import { WISHLIST_LOCALSTORAGE_KEY } from '../constants'

class Wishlist {
  private _wishlist?: Array<IConfigurationResponse>

  constructor() {
    this.getWishlist()
  }

  async getWishlist() {
    if (this._wishlist) return this._wishlist
    const { threekitDomain } = connection.getConnection()

    const wishlistListStr = localStorage.getItem(WISHLIST_LOCALSTORAGE_KEY)
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]')

    const wishlistData = await Promise.all(
      wishlistList.map((el) => threekitAPI.configurations.fetch(el))
    )

    this._wishlist = wishlistData.map((el) =>
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

    return this._wishlist
  }

  async addItem(config?: ISaveConfigurationConfig) {
    if (!this._wishlist) {
      this._wishlist = []
      localStorage.setItem(WISHLIST_LOCALSTORAGE_KEY, JSON.stringify([]))
    }

    const configPrepped = Object.assign({ snapshot: true }, config)

    const savedConfiguration = await window.threekit.treble.saveConfiguration(
      configPrepped
    )
    // const savedConfiguration = await this.saveConfiguration(configPrepped)
    if (!savedConfiguration) return this._wishlist

    this._wishlist = [...this._wishlist, savedConfiguration]
    const wishlistListStr = localStorage.getItem(WISHLIST_LOCALSTORAGE_KEY)
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]')
    wishlistList.push(savedConfiguration.shortId)
    localStorage.setItem(
      WISHLIST_LOCALSTORAGE_KEY,
      JSON.stringify(wishlistList)
    )

    return this.getWishlist()
  }

  removeItemByIdx(idx: number) {
    if (!this._wishlist) {
      this._wishlist = []
      localStorage.setItem(WISHLIST_LOCALSTORAGE_KEY, JSON.stringify([]))
      return this._wishlist
    }

    if (idx > this._wishlist.length - 1) return this._wishlist

    const updatedWishlist = [...this._wishlist]
    updatedWishlist.splice(idx, 1)
    this._wishlist = updatedWishlist

    const wishlistListStr = localStorage.getItem(WISHLIST_LOCALSTORAGE_KEY)
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]')
    wishlistList.splice(idx, 1)

    localStorage.setItem(
      WISHLIST_LOCALSTORAGE_KEY,
      JSON.stringify(wishlistList)
    )

    return this._wishlist
  }

  clearWishlist() {
    this._wishlist = []
    localStorage.setItem(WISHLIST_LOCALSTORAGE_KEY, JSON.stringify([]))
    return this._wishlist
  }
}

export default Wishlist
