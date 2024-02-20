import RNFS from 'react-native-fs'
import base64 from 'base64-js'
import { ImageSourcePropType, ImageURISource } from 'react-native'
import { ImageRequireSource } from 'react-native'

type IndexType =
    "Table" |
    "Chair" |
    "Bookshelf" |
    "Bed" |
    "Wardrobe" |
    "Shelf" |
    "Dressing Table" |
    "Refrigerator" |
    "Stove" |
    "Shoe Cabinet" |
    "Sofa" |
    "Lamp"

const Index: IndexType[] = ["Table", "Chair", "Bookshelf", "Bed", "Wardrobe", "Shelf", "Dressing Table", "Refrigerator", "Stove", "Shoe Cabinet", "Sofa", "Lamp"]


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

export const parseSampleItemImage = (value: string) => {
    const check = Index.find(e => e.includes(value))
    switch (check) {
        case "Table": return require(`../../assets/images/sampleimage/table.jpg`)
        case "Chair": return require(`../../assets/images/sampleimage/chair.jpg`)
        case "Bookshelf": return require(`../../assets/images/sampleimage/bookshelf.jpg`)
        case "Bed": return require(`../../assets/images/sampleimage/bed.jpg`)
        case "Lamp": return require(`../../assets/images/sampleimage/lamp.jpg`)
        case "Wardrobe": return require(`../../assets/images/sampleimage/wardrobe.jpg`)
        case "Shelf": return require(`../../assets/images/sampleimage/shelf.jpg`)
        case "Dressing Table": return require(`../../assets/images/sampleimage/dressing-table.jpg`)
        case "Refrigerator": return require(`../../assets/images/sampleimage/refrigerator.jpg`)
        case "Stove": return require(`../../assets/images/sampleimage/stove.jpg`)
        case "Shoe Cabinet": return require(`../../assets/images/sampleimage/shoe-cabinet.jpg`)
        case "Sofa": return require(`../../assets/images/sampleimage/sofa.jpg`)
        default:
            return require('../../assets/images/dummy.webp')
    }
}