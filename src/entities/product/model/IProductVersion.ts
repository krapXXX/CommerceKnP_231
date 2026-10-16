export default interface IProductVersion {
    id:                string,
    price:             number,
    stock?:            number,  // наявність (у шт)
    titleAddon?:       string,
    descriptionAddon?: string,
    imageUrl:          string,
    slugAddon?:        string,
}