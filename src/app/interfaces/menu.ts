export interface dishes{
    name:string,
    ingredients:string[]
}

export interface Menu {
Starters:dishes[],
MainCourse:dishes[],
Dessert:dishes
}
