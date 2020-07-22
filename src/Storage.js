import {AsyncStorage} from "react-native";

const storeItem = async (key, item) => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
        console.log(error.message);
    }
};

//the functionality of the retrieveItem is shown below
const retrieveItem = async (key) => {
    try {
        const retrievedItem = await AsyncStorage.getItem(key);
        return JSON.parse(retrievedItem);
    } catch (error) {
        console.log(error.message);
    }
    return null;
};

//the functionality of the retrieveItem is shown below
const putItemOnObject = async (object, objectKey, key) => {
    try {
        const retrievedItem = await AsyncStorage.getItem(key);
        object[putItemOnObject] = JSON.parse(retrievedItem);
        return JSON.parse(retrievedItem);
    } catch (error) {
        console.log(error.message);
    }
    return null;
};

// remove the store item on key
const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(error) {
        console.log(error.message);
        return false;
    }
};

// update key by concat new item
const addItemToArray = async (key, item)  => {
    console.log('add >> key-' + key + ' item-' + item)
    try {
        let items = await AsyncStorage.getItem(key);
        if (items !== undefined && items != null) {
            items = JSON.parse(items);
            items.push(item);
            return await AsyncStorage.setItem(key, JSON.stringify(items));
        } else {
            return await AsyncStorage.setItem(key, JSON.stringify([item]));
        }
    } catch (error) {
        console.log(error);
    }
};

const removeItemFromArray = async (key, item) => {
    console.log('remove >> key-' + key + ' item-' + item)
    try {
        let items = await AsyncStorage.getItem(key);
        if(items !== undefined && items != null) {
            let _items = JSON.parse(items);
            _items.pop(item);
            console.log('new items')
            console.log(_items)
            return await AsyncStorage.setItem(key, JSON.stringify(_items));
        }
    } catch (error) {
        console.error(error);
    }
}

export {storeItem, retrieveItem, removeItem, addItemToArray, removeItemFromArray};
