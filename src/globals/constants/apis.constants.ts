import { env } from "process";

const baseApi = env.MODE==='dev'?"http://localhost:8080/": "https://54.234.87.11/";

const addBaseApi = (path: string) => baseApi;
const FormApi  = (path: string) => 'purchaser/forms';
const PagesApi  = (path: string) => 'purchaser/pages';

interface RequestQuerySignup{
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
  role:string;
}

interface RequestQuery {
	categoryId: string;
  itemId: string;
  companyId: string;
}

const apis = {

  getUnverified: addBaseApi('admin/getUnverified'),
	getVerified: addBaseApi('admin/getVerified'),
	getUser:(id:string) => addBaseApi(`admin/${id}`),
	verifyUser : addBaseApi('admin/verifyUser'),
	deleteUser : addBaseApi('admin/deleteUser'),
	viewProfile:(id:string) => addBaseApi(`admin/viewProfile/${id}`),
	checkEmailUnique: (e: string) => addBaseApi(`user/isEmailIdUnique/${e}`),
	getOtp: addBaseApi("user/getOtp"),
	verifyOtp: addBaseApi("user/verifyOtp"),
	sendEmail: addBaseApi("user/sendEmail"),
	addUser: (d: RequestQuerySignup) =>
		addBaseApi(
			`user/signup?firstName=${d.firstName}&lastName=${d.lastName}&email=${d.email}&phoneNumber=${d.phoneNumber}&password=${d.password}`
		),

	getLoginInfo: addBaseApi("user/getLoginInfo"),

  checkCategoryNameisValid: (val: string) => FormApi(`/createCategory/getIsCategoryNameValid/${val}`),
  createCategory: FormApi(`/createCategory/createCategory`),
  getEditFormData: (id: string) => FormApi(`/createCategory/getEditFormData/${id}`),
  editCategory: FormApi(`/createCategory/editCategory`),
  getCategoryUnique: (name: string) => FormApi(`createCategory/getCategoryUnique/${name}`),
  createCompany: FormApi(`/createCompany/createCompany`),
  getFormDesc: (id: string) => FormApi(`/createCompany/getFormDesc/${id}`),
  editCompany: FormApi(`/createCompany/editCompany`),
  getCompanyNameUnique: (name: string) => FormApi(`/createCompany/getCompanyUnique/${name}`),
  checkCompanyProductNameUnique: (company_name: string, category_name: string, item_name: string) => FormApi(`/createCompanyProduct/checkCompanyProductUnique/${company_name}/${category_name}/${item_name}`),
  createCompanyProduct: FormApi(`/createCompanyProduct/createCompanyProduct`),
  getAllCompanies: FormApi(`/createCompanyProduct/getAllCompanies`),
  getAllCategories: FormApi(`/createCompanyProduct/getAllCategories`),
  getItemsOfCategory: (id: string) => FormApi(`/createCompanyProduct/getItemsofCategory/${id}`),
  getFormdescription: (d: RequestQuery) => FormApi(`/createCompanyProduct/getFormDescription?companyId=${d.companyId}&itemId=${d.itemId}&categoryId=${d.categoryId}`),
  editFormDescription: (id: string) => FormApi(`/createCompanyProduct/editFormDescription/${id}`),
  editCompanyProduct: FormApi(`/createCompanyProduct/editCompanyProduct`),
  createItem : FormApi(`/createItem/createItem`),
  getDescriptionLables :(id:string) => FormApi(`/createItem/getDescriptionLables/${id}`),
  getEditFormSpec: (id:string) => FormApi(`/createItem/getEditFormSpec/${id}`),
  editItem : FormApi(`/createItem/editItem`),
  getItemUnique : (item_name: string, category_name:string) => FormApi(`createItem/getItemUnique/${item_name}/${category_name}`),

  getCategoryGridData : PagesApi('/category/getCategoryGridData'),
  getCategorySpecification :(id:string) => PagesApi(`/categorySpecification/specification/${id}`),
  getItemGridData: (id:string) => PagesApi(`/categoryNumberOfItem/getItemGridData/${id}`),
  updateItemActiveCompany : PagesApi(`/categoryNumberOfItem/updateItemActiveCompany`),
  getActiveInactiveCompany :(id:string) => PagesApi(`/categoryNumberOfItem/getActiveInactiveCompany/${id}`),
  getItemData :(id:string) => PagesApi(`/itemSpecification/getItemData/${id}`),
  getCompanyProductGridData :(id:string) => PagesApi(`/itemSpecification/getCompanyProductGridData/${id}`),
  getCompanyGridData : PagesApi(`/companyListing/getCompanyProductGridData`),
  getCompanySpecificationData : (id:string) =>PagesApi(`/companySpecification/getCompanySpecificationData/${id}`),
  getProductGridData : (id:string) =>PagesApi(`/companySpecification/getProductGridData/${id}`),
  getAllCompaniesWithBaseRate : PagesApi(`/setBasePrice/getAllCompaniesWithBaseRate`),
  updateCompanyBaseRate : PagesApi(`/setBasePrice/updateCompanyBaseRate`),
  getProductSpecification :(id:string) => PagesApi(`/productSpecification/getProductSpecification/${id}`),
  getFilteredProductsPriceStructure: PagesApi(`/companyProductListing/getFilteredProductsPriceStructure`),
  updateAllProductPriceStructureValue : PagesApi(`/companyProductListing/updateAllProductPriceStructureValue`),
}

export default apis;