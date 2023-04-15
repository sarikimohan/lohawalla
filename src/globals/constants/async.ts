import axios from "axios";
import { env } from "process";
import apis from "./apis.constants";
import { responsiveFontSizes } from "@mui/material";

const baseURLS = {
  dev: 'http://localhost:8080/',
  prod: 'https://54.234.87.11/',
};

type modes = keyof typeof baseURLS;

type ObjectLiteral<T> = {
	[key: string]: T;
};

const API = axios.create({
  baseURL: baseURLS[env.MODE as modes],
});

interface GetAnyThingProps {
  name: string
}

async function getAnyThing(reqBody: GetAnyThingProps) {
  setTimeout(() =>{console.log('fetching')}, 2000)
}

interface useId{
  id: string;
}

//admin
async function getUnverified(){
  let response = await API.get(apis.getUnverified);
  return response.data
}

async function getVerified(){
  let response = await API.get(apis.getVerified);
  return response.data
}

async function getUser(reqParams: useId){
  let response = await API.get(apis.getUser(reqParams.id))
  return response.data
}

async function verifyUser(reqBody : {userId:string, option:'verify'|'decline'}){
 let response  = await API.post(apis.verifyUser, {reqBody});
 return response.data
}

async function deleteUser(reqBody: useId){
  let response  = await API.post(apis.deleteUser, {reqBody});
  return response.data
}

async function viewProfile(reqParams: useId){
  let response  = await API.get(apis.viewProfile(reqParams.id));
  return response.data
}

//User
async function checkEmailUnique(reqParams: {email: string}){
  let response = await API.get(apis.checkEmailUnique(reqParams.email));
  return response.data
}

async function getOtp(reqBody:{phoneNumber:any}){
  let response = await API.post(apis.getOtp, {reqBody});
  return response.data
}

async function verifyOtp(reqBody: {otp:any, phoneNumber:any}){
  let response = await API.post(apis.verifyOtp, {reqBody});
  return response.data
}

async function sendEmail(reqBody: {email: string}){
  let response = await API.post(apis.sendEmail, {reqBody});
  return response.data
}

interface RequestQuerySignup{
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
  role:string
}

async function addUser(reqQuery: RequestQuerySignup, reqBody:{aadhar:any, profilePhoto:any}){
  let response = await API.post(apis.addUser(reqQuery), {reqBody});
  return response.data
}

async function getLoginInfo(){
  let response = await API.get(apis.getLoginInfo);
  return response.data
}

//FORMS

interface checkCategoryName {
  name: string
}

async function checkCategoryNameisValid(reqParams: checkCategoryName){
  let response = await API.get(apis.checkCategoryNameisValid(reqParams.name) )
  return response.data
}

async function getCategoryUnique(reqParams: checkCategoryName){
  let response = await API.get(apis.getCategoryUnique(reqParams.name) )
  return response.data
}

interface createCategory{
  categoryName: string;
  categoryCode: string;
  description: string;
  images: File[];
  credits: {
    old: { _id: string; days: string; value: string }[];
    added: { index: string; days: string; value: string }[];
  };
  negotiation: string;
  descriptionLabels: ObjectLiteral<{ key: string; value: string }>
}

async function createCategory(reqBody: createCategory){
  let response = await API.post(apis.createCategory, {reqBody});
  return response.data   
}

async function getEditFormData(reqParams : useId){
  let response = await API.get(apis.getEditFormData(reqParams.id));
  return response.data 
}

interface EditCategoryFormState<T = string> {
  categoryName: T;
  categoryCode: T;
  description: T;
  credits: { _id: string; days: string; percentage: T }[];
  negotiation: T;
  descriptionLabels: {
    _id: string;
    name: string;
    value: T;
  }[];
}

async function editCategory(reqBody: EditCategoryFormState){
  let response = await API.post(apis.createCategory, {reqBody});
  return response.data  
}

interface createCompany{
  companyName: string;
	description: string;
	priceStructure: {
		fixed: { key: string; value: number; type: string; operation: string }[];
		variable: { key: string; type: string; operation: string }[];
	};
	descriptionLabels: {
		key: string;
		value: string;
	}[];
	images: string[]
}

async function createCompany(reqBody: createCompany){
  let response = await API.post(apis.createCompany, {reqBody});
  return response.data
}

async function getFormDesc(reqParams: useId){
  let response = await API.get(apis.getFormDesc(reqParams.id));
  return response.data
}

  type PriceFieldStatus = "initial" | "modified" | "deleted" | "added"; 

  interface EditCompanyFormData<T = string> {
    companyName: T;
    description: T;
    priceStructure: {
      _id: string;
      name: string;
      type: "numeric" | "percentage";
      operation: "subtract" | "add";
      value: T;
      isFixed: boolean;
      status: PriceFieldStatus;
    }[];
    descriptionLabels: {
      _id: string;
      name: string;
      value: T;
    }[];
  }

  interface PriceStructureField {
    _id: string;
    name: string;
    type: "numeric" | "percentage";
    operation: "subtract" | "add";
    value: string;
    isFixed: boolean;
    status: PriceFieldStatus;
  }

async function editCompany(reqBody : { body: EditCompanyFormData & { _id: string } } ){
  let response = await API.post(apis.editCompany, {reqBody});
  return response.data
}

interface uniqueCompanyName{
  name: string
}

async function getCompanyNameUnique(reqParams: uniqueCompanyName){
 let response = await API.post(apis.getCompanyNameUnique(reqParams.name));
 return response.data
}

interface checkCompanyProductNameUnique{
  company_name: string;
  category_name: string;
  item_name: string;
}

async function checkCompanyProductNameUnique(reqParams: checkCompanyProductNameUnique){
  const {company_name, category_name, item_name} = reqParams
  let response = await API.get(apis.checkCompanyProductNameUnique(company_name, category_name, item_name));
  return response.data
}

interface CompanyProductFormData {
	companyId: string;
	categoryId: string;
	itemId: string;
	priceStructure: { pfid: string; value: string }[];
	gst: {
		type: "numeric" | "percentage";
		value: number;
	};
	description: string;
	descriptionLabels: { key: string; value: string }[];
	images: string[];
}

async function createCompanyProduct(reqBody: CompanyProductFormData){
  let response = await API.post(apis.createCompanyProduct, {reqBody});
  return response.data
}

async function getAllCompanies(){
  let response = await API.get(apis.getAllCompanies);
  return response.data
}

async function getAllCategories(){
  let response = await API.get(apis.getAllCategories);
  return response.data
}

async function getItemsOfCategory(reqParams: useId){
  let response = await API.get(apis.getItemsOfCategory(reqParams.id));
  return response.data
}

interface getFormdescription{
	categoryId: string;
  itemId: string;
  companyId: string;
}

async function getFormdescription(reqQuery: getFormdescription){
  let response = await API.get(apis.getFormdescription(reqQuery));
  return response.data
}

interface EditFormRequestData {
	_id: string;
	// edit them
	priceStructure: {
		_id: string;
		value: string;
	}[];
	// edit them
	description: string;
	// delete and resave
	descriptionLabels: {
		name: string;
		value: string;
	}[];
}

async function editFormDescription(reqParams: useId){
  let response = await API.get(apis.editFormDescription(reqParams.id));
  return response.data
}

async function editCompanyProduct(reqBody: EditFormRequestData){
  let response = await API.put(apis.editCompanyProduct, {reqBody});
  return response.data
}

interface CreateItemForm {
	cid: string;
	name: string;
	itemHSNCode: string;
	itemCode: string;
	online: string;
	cash: string;
	description: string;
	descriptionLabels: { key: string; value: string }[];
	images: string[]
}

async function createItem(reqBody: CreateItemForm){
  let response = await API.post(apis.createItem, {reqBody});
  return response.data
}

async function getDescriptionLables(reqParams: useId){
  let response = await API.get(apis.getDescriptionLables(reqParams.id));
  return response.data
}

async function getEditFormSpec(reqParams: useId){
  let response = await API.get(apis.getEditFormSpec(reqParams.id));
  return response.data
}

interface EditFormSpecification<T = string> {
	itemName: T;
	itemHSNCode: T;
	itemCode: T;
	marginStructure: {
		online: T;
		cash: T;
	};
	descriptionLabels: {
		_id: string;
		name: string;
		value: T;
	}[];
	description: T;
}

async function editItem(reqBody: {body:EditFormSpecification, _id:string}) {
  let response = await API.post(apis.editItem, {reqBody});
  return response.data
}

interface checkItemNameUnique{
  item_name: string;
  category_name:string;
}

async function getItemUnique(reqParams: checkItemNameUnique){
  const {item_name, category_name} = reqParams
  let response = await API.get(apis.getItemUnique(item_name, category_name));
  return response.data
}

//PAGES
async function getCategoryGridData(){
  let response = await API.get(apis.getCategoryGridData);
  return response.data
}

async function getCategorySpecification(reqParams: useId){
  let response = await API.get(apis.getCategorySpecification(reqParams.id));
  return response.data;
}

async function getItemGridData(reqParams: useId){
  let response = await API.get(apis.getItemGridData(reqParams.id))
  return response.data
}

interface updateItemCompany{ companyId: string; itemId: string }
interface updateItemActiveCompanyList {
  updateList: { companyId: string; itemId: string }[]
}

async function updateItemActiveCompany(reqBody: updateItemActiveCompanyList) {
  let response = await API.put(apis.updateItemActiveCompany, {reqBody});
  return response.data
}

async function getActiveInactiveCompany(reqParams:useId) {
  let response = await API.get(apis.getActiveInactiveCompany(reqParams.id));
  return response.data
}

async function getItemData(reqParams: useId){
  let response = await API.get(apis.getItemData(reqParams.id));
  return response.data
}

async function getCompanyProductGridData(reqParams: useId) {
  let response = await API.get(apis.getCompanyProductGridData(reqParams.id))
  return response.data
} 

async function getCompanyGridData(){
  let response = await API.get(apis.getCompanyGridData)
  return response.data
}

async function getCompanySpecificationData(reqParams: useId){
  let response = await API.get(apis.getCompanySpecificationData(reqParams.id))
  return response.data
}

async function getProductGridData(reqParams: useId){
 let response = await API.get(apis.getProductGridData(reqParams.id));
 return response.data
}

async function getAllCompaniesWithBaseRate(){
  let response = await API.get(apis.getAllCompaniesWithBaseRate);
  return response.data
}

type baseRate = { _id: string, value: number }
interface newData{
  newData: baseRate[]
}

async function updateCompanyBaseRate(reqBody : newData){
  let response = await API.put(apis.updateCompanyBaseRate, {reqBody});
  return response.data
}

async function getProductSpecification(reqParams: useId){
  let response = await API.get(apis.getProductSpecification(reqParams.id));
  return response.data
}

async function getFilteredProductsPriceStructure(){
  let response = await API.get(apis.getFilteredProductsPriceStructure);
  return response.data
}

interface SetPriceReqBody {
	data: { _id: string; value: string }[];
}

async function updateAllProductPriceStructureValue(reqBody: SetPriceReqBody){
  let response = await API.put(apis.updateAllProductPriceStructureValue, {reqBody});
  return response.data;
}