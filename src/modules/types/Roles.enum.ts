enum RoleIndex {
	CUSTOMER = "CUSTOMER",
	ADMIN = "ADMIN",
	PURCHASER = "PURCHASER",
	PURCHASER_UNVERIFIED = "PURCHASER_UNVERIFIED",
	SALES = "SALES",
	SALES_UNVERIFIED = "SALES_UNVERIFIED",
	UNKNOWN = "UNKNOWN",
}

export default RoleIndex;
export type Roles = keyof typeof RoleIndex;
