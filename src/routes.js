import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

//Product


const POS = React.lazy(() => import('./views/base/POS/POSTable'))
const RegisterSystem = React.lazy(() => import('./views/base/RegisterSystem/Register'))
const AllProducts = React.lazy(() => import('./views/Product/AllProducts/AllProducts'))
const Brands = React.lazy(() => import('./views/Product/Brands/Brands'))
const AddBrands = React.lazy(() => import('./views/Product/AddBrands/AddBrands'))
const AddProduct = React.lazy(() => import('./views/Product/AddProduct/AddProduct'))
const ParentCategory = React.lazy(() => import('./views/Product/ParentCategory/ParentCategory'))
const AddParentCategory = React.lazy(() => import('./views/Product/AddParentCategory/AddParentCategory'))
const Attributes = React.lazy(() => import('./views/Product/Attributes/Attributes'))
const AddAttributes = React.lazy(() => import('./views/Product/AddAttributes/AddAttributes'))
const AddAttributeType = React.lazy(() => import('./views/Product/AddAttributeType/AddAttributeType'))
const Variations = React.lazy(() => import('./views/Product/Variations/Variations'))
const AddVariations = React.lazy(() => import('./views/Product/AddVariations/AddVariations'))
const Category = React.lazy(() => import('./views/Product/Category/Category'))
const AddCategory = React.lazy(() => import('./views/Product/AddCategory/AddCategory'))
const SubCategory = React.lazy(() => import('./views/Product/SubCategory/SubCategory'))
const AddSubCategory = React.lazy(() => import('./views/Product/AddSubCategory/AddSubCategory'))
const AddHeadCategory = React.lazy(() => import('./views/Product/AddHeadCategory/AddHeadCategory'))
const AddStock = React.lazy(() => import('./views/Stock/AddStock/AddStock'))
const AddCustomer = React.lazy(() => import('./views/Customer/AddCustomer/AddCustomer'))
const CustomerChannel = React.lazy(() => import('./views/Customer/CustomerChannel/CustomerChannel'))
const CustomerType = React.lazy(() => import('./views/Customer/CustomerType/CustomerType'))
const AddOutlet = React.lazy(() => import('./views/Outlet/AddOutlet/AddOutlet'))
const FetchAttributes = React.lazy(() => import('./views/Product/FetchAttributes/FetchAttributes'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  
  { path: '/base/POS', name: 'POS', element: POS }, // POS
  { path: '/base/RegisterSystem', name: 'RegisterSystem', element: RegisterSystem }, // Register
  { path: '/Product/AllProducts', name: 'AllProducts', element: AllProducts }, //AllProducts
  { path: '/Product/Brands', name: 'Brands', element: Brands }, //Brands
  { path: '/Product/AddBrands', name: 'AddBrands', element: AddBrands }, //AddBrands
  { path: '/Product/AddProduct', name: 'AddProduct', element: AddProduct }, //AddProduct
  { path: '/Product/AddBrands/:id', name: 'EditBrand', element: AddBrands }, // Edit Brand
  { path: '/Product/ParentCategory', name: 'ParentCategory', element: ParentCategory }, //ParentCategory
  { path: '/Product/AddParentCategory', name: 'AddParentCategory', element: AddParentCategory }, //AddParentCategory
  { path: '/Product/AddParentCategory/:id', name: 'EditParentCategory', element: AddParentCategory }, // Edit ParentCategory
  { path: '/Product/Attributes', name: 'Attributes', element: Attributes }, //Attributes
  { path: '/Product/AddAttributes', name: 'AddAttributes', element: AddAttributes }, //AddAttributes
  { path: '/Product/AddAttributes/:id', name: 'EditAttributes', element: AddAttributes }, // EditAttributes
  { path: '/Product/Variations', name: 'Variations', element: Variations }, //Variations
  { path: '/Product/AddVariations', name: 'AddVariations', element: AddVariations }, //AddAttributes
  { path: '/Product/AddVariations/:id', name: 'EditVariations', element: AddVariations }, // Edit Variations
  { path: '/Product/AddCategory/:id', name: 'EditCategory', element: AddCategory }, // Edit Category
  { path: '/Product/AddAttributeType', name: 'AddAttributeType', element: AddAttributeType }, // AddAttributeType
  { path: '/Product/Category', name: 'Category', element: Category }, //Category
  { path: '/Product/AddCategory', name: 'AddCategory', element: AddCategory }, //AddCategory
  { path: '/Product/SubCategory', name: 'SubCategory', element: SubCategory }, //SubCategory
  { path: '/Product/AddSubCategory', name: 'AddSubCategory', element: AddSubCategory }, //AddSubCategory
  { path: '/Product/AddHeadCategory', name: 'AddHeadCategory', element: AddHeadCategory }, //AddHeadCategory
  { path: '/Stock/AddStock', name: 'AddStock', element: AddStock }, //AddStock
  { path: '/Customer/AddCustomer', name: 'AddCustomer', element: AddCustomer }, //AddCustomer
  { path: '/Customer/CustomerChannel', name: 'CustomerChannel', element: CustomerChannel }, // CustomerChannel
  { path: '/Customer/CustomerType', name: 'CustomerType', element: CustomerType }, // CustomerType
  { path: '/Outlet/AddOutlet', name: 'AddOutlet', element: AddOutlet }, // AddOutlet
  { path: '/Product/FetchAttributes', name: 'FetchAttributes', element: FetchAttributes }, // FetchAttributes
  { path: '/Product/AddSubCategory/:id', name: 'EditCategory', element: AddSubCategory }, // Edit SubCategory
  
 
]

export default routes
