const APP_VERSION = 0.1;

const ITEMS_STORAGE_KEY = "items-storage";
const RECIPES_STORAGE_KEY = "recipes-storage";
const DEV_SETTINGS_KEY = "dev-settings";

const defaultDevSettings = {
    appVersion: 0
}

export default{
    getCurrentAppVersion(){return APP_VERSION;},

    getItemsStorageKey(){return ITEMS_STORAGE_KEY;},
    getRecipesStorageKey(){return RECIPES_STORAGE_KEY;},
    getDevSettingsKey(){return DEV_SETTINGS_KEY;},

    getDefaultDevSettings(){return defaultDevSettings},

    JsonDateParser(key, value) {
        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        var reMsAjax = /^\/Date\((d|-|.*)\)[\\/|\\]$/;

        if (typeof value === 'string') {
            var a = reISO.exec(value);
            
            if (a) return new Date(value);
            
            a = reMsAjax.exec(value);
            if (a) {
                var b = a[1].split(/[-+,.]/);
                return new Date(b[0] ? +b[0] : 0 - +b[1]);
            }
        }
        return value;
    },
    
    sameDay(d1, d2) {
        return  d1.getFullYear() === d2.getFullYear() && 
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate();
    },

    fixItemType(itemQuantity){
        if(itemQuantity.type == "Item" && itemQuantity.ammount != 1) itemQuantity.type = "Items";
        else if (itemQuantity.type == "Items" && itemQuantity.ammount == 1) itemQuantity.type = "Item";
    },

    getFormatedDate(date){
        let tempToday = new Date(date);
        return new Date(tempToday.getFullYear(), tempToday.getMonth(), tempToday.getDate());
    }
}
