import RNFS from 'react-native-fs'
import base64 from 'base64-js'
import { ImageSourcePropType, ImageURISource } from 'react-native'
import { ImageRequireSource } from 'react-native'

export const parseIndexImage = (value: string) => {
    switch (value) {
        case "Table": return require('../../assets/icons/side-table.png')
        case "Chair": return require('../../assets/icons/chair.png')
        case "Bookshelf": return require('../../assets/icons/bookshelf.png')
        case "Bed": return require('../../assets/icons/double-bed.png')
        case "Wardrobe": return require('../../assets/icons/wardrobe.png')
        case "Shelf": return require('../../assets/icons/shelf.png')
        case "Dressing Table": return require('../../assets/icons/mirror.png')
        case "Refrigerator": return require('../../assets/icons/fridge.png')
        case "Stove": return require('../../assets/icons/stove.png')
        case "Shoe Cabinet": return require('../../assets/icons/high-heels.png')
        case "Sofa": return require('../../assets/icons/couch.png')
        case "Lamp": return require('../../assets/icons/table-lamp.png')

        default: return require('../../assets/icons/menu.png')
    }
}