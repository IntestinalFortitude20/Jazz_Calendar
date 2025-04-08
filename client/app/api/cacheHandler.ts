import Storage from "expo-sqlite/kv-store";
// AsyncStorage & Caching alternative for Expo


export default async function getCache(key: string) {
    
    const cachedData = await Storage.getItem(key);
    
    if (cachedData) {
        return JSON.parse(cachedData);  // return cached value
    } else {
        console.log("\nCache key MISS!");
        return null; // return null if no cached value
    }
}