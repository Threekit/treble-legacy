import connection from '../connection'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { createSelector } from 'reselect'
import { RootState, ThreekitDispatch } from './index'
import {
  IConfiguration,
  ISetConfiguration,
  // IThreekitConfigurator,
  IThreekitDisplayAttribute,
  IMetadata,
  DISPLAY_OPTIONS,
} from '../threekit'
import threekitAPI from '../api'
import { getParams, createThreekitScriptEl } from '../utils'
import {
  DEFAULT_PLAYER_CONFIG,
  TK_SAVED_CONFIG_PARAM_KEY,
  TK_PLAYER_ROOT_DIV,
} from '../constants'
import { ITranslationMap } from '../api/products'
import Treble, { ISaveConfigurationConfig } from '../Treble'
import { IConfigurationResponse } from '../http/configurations'

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export interface IThreekitCredentials {
  publicToken: string
  assetId: string
  orgId: string
  stageId?: string
  publishStage?: string
  threekitDomain?: string
}

export interface ILaunchConfig {
  //  Threekit Env to use
  threekitEnv?: string
  //  Threekit Env specific credentials
  preview: IThreekitCredentials
  'admin-fts': IThreekitCredentials
  //  Custom Configuration (For preset)
  configurationId?: string
  //  Threekit Player Init
  elementId?: string
  public: string
  cache?: string
  showConfigurator?: boolean
  initialConfiguration?: IConfiguration
  showLoadingThumbnail?: boolean
  showLoadingProgress?: boolean
  onLoadingProgress?: boolean
  showAR?: boolean
  showShare?: boolean
  locale?: string
  allowMobileVerticalOrbit?: boolean
  publishStage?: string
  display?: DISPLAY_OPTIONS
  //  Language Stuff
  language?: string | undefined
}

interface IPriceConfig {
  id: string
  currency: string
}

export interface IPrice {
  price: number
  currency: string
}

/*****************************************************
 * Helper Functions
 ****************************************************/

const createPlayerLoaderEl = (elementId: string): HTMLElement => {
  /**
   * By default the player is loaded into a player-loader div that
   * is placed outside the user's view. This is done because in
   * React the Threekit Initialization may happen before the
   * component with the player HTML element has loaded which would
   * otherwise throw an error.
   */
  let playerElement = document.getElementById(elementId)
  if (playerElement) return playerElement

  playerElement = document.createElement('div')
  playerElement.setAttribute('id', elementId)
  playerElement.style.height = '100%'

  const playerLoader = document.createElement('div')
  playerLoader.setAttribute('id', 'tk-player-loader')
  playerLoader.appendChild(playerElement)
  playerLoader.style.opacity = '0'
  playerLoader.style.height = '1px'
  playerLoader.style.position = 'fixed'
  playerLoader.style.top = '-100%'

  document.body.appendChild(playerLoader)
  return playerElement
}

/*****************************************************
 * State
 ****************************************************/

export interface ThreekitState {
  //  HTML Player element's ID
  playerElId: undefined | string
  //  Name of the Intialized Item
  name: undefined | string
  //  Initialized item's metadata
  metadata: undefined | IMetadata
  //  Selected language
  translations: undefined | ITranslationMap
  language: string | undefined
  //  Price
  priceConfig: IPriceConfig | null
  //  Tracks configuration update
  isPlayerLoading: boolean
  //  Tracks Threekit API initialization status
  isThreekitLoaded: boolean
  //  Attributes State
  attributes: undefined | Array<IThreekitDisplayAttribute>
  //  Wishlist
  wishlist: Array<IConfigurationResponse>
}

const initialState: ThreekitState = {
  //  Player HTML element
  playerElId: undefined,
  //  Name of the Intialized Item
  name: undefined,
  //  Initialized item's metadata
  metadata: undefined,
  //  Selected language
  translations: undefined,
  language: undefined,
  //  Price
  priceConfig: null,
  //  Tracks Threekit API initialization status
  isThreekitLoaded: false,
  //  Tracks configuration update
  isPlayerLoading: false,
  //  Attributes State
  attributes: undefined,
  wishlist: [],
}

const { actions, reducer } = createSlice({
  name: 'threekit',
  initialState,
  reducers: {
    //  Loading Trackers
    setThreekitLoaded: (state, _) => {
      state.isThreekitLoaded = true
    },
    setPlayerLoading: (state, action: PayloadAction<boolean>) => {
      state.isPlayerLoading = action.payload
    },
    //  Intialized Item's Name
    setPlayerElement: (state, action: PayloadAction<string>) => {
      state.playerElId = action.payload
    },
    //  Intialized Item's Name
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    //  Intialized Item's Metadata
    setMetadata: (state, action: PayloadAction<IMetadata>) => {
      state.metadata = action.payload
    },
    //  Language
    setTranslations: (state, action: PayloadAction<ITranslationMap>) => {
      state.translations = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
    //  Price
    setPriceConfig: (state, action: PayloadAction<IPriceConfig | null>) => {
      state.priceConfig = action.payload
    },
    //  Attributes
    setAttributes: (
      state,
      action: PayloadAction<Array<IThreekitDisplayAttribute>>
    ) => {
      state.attributes = action.payload
    },
    //  Wishlist
    setWishlist: (
      state,
      action: PayloadAction<Array<IConfigurationResponse>>
    ) => {
      state.wishlist = action.payload
    },
  },
})

/*****************************************************
 * Actions
 ****************************************************/

//  Actions to be used only internally
const {
  setPlayerLoading,
  setName,
  setMetadata,
  setPriceConfig,
  setAttributes,
  setLanguage,
  setTranslations,
  setPlayerElement,
  setWishlist,
} = actions

//  Actions to be used only internally and externally
export const { setThreekitLoaded } = actions

/*****************************************************
 * Standard Selectors
 ****************************************************/

//  Loading Trackers
export const isThreekitLoaded = (state: RootState): boolean =>
  state.threekit.isThreekitLoaded

export const isPlayerLoading = (state: RootState): boolean =>
  state.threekit.isPlayerLoading

//  Player's HTML element
export const getPlayerElementId = (state: RootState): undefined | string =>
  state.threekit.playerElId

//  Initialized item's name
export const getName = (state: RootState): undefined | string =>
  state.threekit.name

//  Price
export const getPrice = (state: RootState): undefined | IPrice => {
  const { priceConfig } = state.threekit
  if (!priceConfig) return undefined
  const price = window.threekit.configurator.getPrice(
    priceConfig.id,
    priceConfig.currency
  )
  return { price, currency: priceConfig.currency }
}

//  Metadata
export const getMetadata = (state: RootState): undefined | IMetadata =>
  state.threekit.metadata

//  Languages and Translations
export const getLanguage = (state: RootState): undefined | string =>
  state.threekit.language

export const getLanguageOptions = (state: RootState): Array<string> => {
  if (!state.threekit.isThreekitLoaded || !state.threekit.translations)
    return []
  return Object.keys(Object.values(state.threekit.translations)[0])
}

//  Attributes
export const getAttributes = (
  state: RootState
): undefined | Record<string, IThreekitDisplayAttribute> => {
  const { isThreekitLoaded, attributes, language, translations } =
    state.threekit

  if (!isThreekitLoaded) return undefined
  if (!attributes) return undefined

  const hasTranslation = !!language && !!translations
  return attributes.reduce(
    (
      output: Record<string, IThreekitDisplayAttribute>,
      attribute: IThreekitDisplayAttribute
    ) =>
      Object.assign(output, {
        [attribute.name]: Object.assign(
          {},
          attribute,
          {
            label: hasTranslation
              ? translations?.[attribute.name]?.[language] || attribute.name
              : attribute.name,
          },
          attribute.type === 'String'
            ? {
                values: attribute.values.map((el) =>
                  Object.assign({}, el, {
                    label: hasTranslation
                      ? translations?.[el.label]?.[language] || el.label
                      : el.label,
                  })
                ),
              }
            : attribute.type === 'Asset'
            ? {
                values: attribute.values.map((el) =>
                  Object.assign({}, el, {
                    label: hasTranslation
                      ? translations?.[el.name]?.[language] || el.name
                      : el.name,
                  })
                ),
              }
            : undefined
        ),
      }),
    {} as Record<string, IThreekitDisplayAttribute>
  )
}

//  Wishlist
export const getWishlist = (state: RootState) => state.threekit.wishlist

/*****************************************************
 * Complex Selectors
 ****************************************************/

//  Attributes
// export const getAttribute = (attribute: string) =>
//   createSelector(
//     getAttributes,
//     (attributes) => attributes?.[attribute] || undefined
//   )

/*****************************************************
 * Complex Actions
 ****************************************************/

export const launch =
  (launchConfig: ILaunchConfig) => async (dispatch: ThreekitDispatch) => {
    if (window.threekit) return
    const {
      //  Threekit Env specific credentials,
      threekitEnv,
      //  User saved configuration
      configurationId,
      //  Threekit Player Init
      elementId,
      // cache,
      showConfigurator,
      initialConfiguration: initialConfigurationRaw,
      showLoadingThumbnail,
      showLoadingProgress,
      onLoadingProgress,
      showAR,
      showShare,
      locale,
      allowMobileVerticalOrbit,
      publishStage,
      display,
    } = Object.assign(DEFAULT_PLAYER_CONFIG, launchConfig)

    const threekitCredentials = launchConfig[threekitEnv || 'preview']
    const threekitDomainRaw =
      threekitCredentials.threekitDomain || `${threekitEnv}.threekit.com`
    const {
      assetId,
      publicToken: authToken,
      orgId,
      stageId,
    } = threekitCredentials

    //  Connection
    connection.connect({
      authToken,
      orgId,
      assetId,
      threekitDomain: threekitDomainRaw,
    })

    //  We use the threekitDomain returned by the connection object
    //  As it ensures the env base url starts with 'https://'
    const { threekitDomain } = connection.getConnection()

    //  Initial Configuration from Params
    let initialConfiguration = { ...initialConfigurationRaw }
    let updatedAssetId = assetId
    const params = getParams()

    const configId = params[TK_SAVED_CONFIG_PARAM_KEY]?.length
      ? params[TK_SAVED_CONFIG_PARAM_KEY]
      : configurationId
    if (configId) {
      const configuration = await threekitAPI.configurations.fetch(
        configId as string
      )
      if (configuration) {
        initialConfiguration = Object.assign(
          {},
          initialConfigurationRaw,
          configuration.data.variant
        )
        connection.connect({ assetId: configuration.data.productId })
        updatedAssetId = configuration.data.productId
      }
    }

    //  We get or create the player HTML element
    let el
    if (elementId) {
      el = document.getElementById(elementId)
      if (el) dispatch(setPlayerElement(elementId))
    } else {
      el = createPlayerLoaderEl(TK_PLAYER_ROOT_DIV)
      dispatch(setPlayerElement(TK_PLAYER_ROOT_DIV))
    }

    //  We create the threekit script
    await createThreekitScriptEl(threekitDomain)

    const [player, translations, pricebook] = await Promise.all([
      window.threekitPlayer({
        el: el as HTMLElement,
        authToken,
        // cache,
        stageId,
        assetId: updatedAssetId,
        showConfigurator,
        initialConfiguration,
        showLoadingThumbnail,
        showLoadingProgress,
        onLoadingProgress,
        showAR,
        showShare,
        locale,
        allowMobileVerticalOrbit,
        publishStage,
        display,
      }),
      threekitAPI.products.fetchTranslations(),
      threekitAPI.price.getPricebooksList(),
    ])

    window.threekit = {
      player,
      configurator: await player.getConfigurator(),
      treble: new Treble({ player }),
    }

    if (launchConfig.language) {
      dispatch(setLanguage(launchConfig.language))
      dispatch(setTranslations(translations))
    }

    if (pricebook.length) {
      const priceConfig = {
        id: pricebook[0].id,
        currency: pricebook[0].currencies[0],
      }
      dispatch(setPriceConfig(priceConfig))
    }

    const productName = window.threekit.player.scene.get({
      id: window.threekit.player.assetId,
    }).name
    dispatch(setName(productName))
    dispatch(setMetadata(window.threekit.configurator.getMetadata()))
    dispatch(setAttributes(window.threekit.configurator.getDisplayAttributes()))

    dispatch(setThreekitLoaded(true))
    dispatch(setPlayerLoading(false))

    const wishlistData = await window.threekit.treble.getWishlist()
    dispatch(setWishlist(wishlistData))

    return
  }

//  Configurator
export const setConfiguration =
  (config: ISetConfiguration) => async (dispatch: ThreekitDispatch) => {
    dispatch(setPlayerLoading(true))
    await window.threekit.configurator.setConfiguration(config)
    const updatedAttributes =
      window.threekit.configurator.getDisplayAttributes()
    dispatch(setAttributes(updatedAttributes))
    dispatch(setPlayerLoading(false))
  }

//  Wishlst
export const addToWishlist =
  (config: ISaveConfigurationConfig) => async (dispatch: ThreekitDispatch) => {
    const wishlistData = await window.threekit.treble.addToWishlist(config)
    dispatch(setWishlist(wishlistData))
  }

export const removeFromWishlist =
  (idx: number) => (dispatch: ThreekitDispatch) => {
    const wishlistData = window.threekit.treble.removeFromWishlist(idx)
    dispatch(setWishlist(wishlistData))
  }

export const resumeFromWishlist =
  (idx: number) => (dispatch: ThreekitDispatch, getState: () => RootState) => {
    const { threekit } = getState()
    const savedConfiguration = threekit.wishlist[idx]
    if (!savedConfiguration) return
    dispatch(setConfiguration(savedConfiguration.variant))
  }

export const clearWishlist = () => (dispatch: ThreekitDispatch) => {
  const wishlistData = window.threekit.treble.clearWishlist()
  dispatch(setWishlist(wishlistData))
}

export default reducer
