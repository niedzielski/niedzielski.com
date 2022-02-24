export type JSONValue = JSONPrimitive | JSONArray | JSONObject
export type JSONObject = {[key: string]: JSONValue}
export type JSONArray = JSONValue[]
export type JSONPrimitive = string | number | boolean | null
