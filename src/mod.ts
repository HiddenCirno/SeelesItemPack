import { DependencyContainer } from "tsyringe";
import crypto from "crypto";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { DialogueHelper } from "@spt-aki/helpers/DialogueHelper";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import type { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { IModLoader } from "@spt-aki/models/spt/mod/IModLoader";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { Traders } from "@spt-aki/models/enums/Traders";
import { QuestStatus } from "@spt-aki/models/enums/QuestStatus";
import { MessageType } from "@spt-aki/models/enums/MessageType";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { VFS } from "@spt-aki/utils/VFS"
import { NotificationSendHelper } from "@spt-aki/helpers/NotificationSendHelper";
import { NotifierHelper } from "@spt-aki/helpers/NotifierHelper";
import { QuestHelper } from "@spt-aki/helpers/QuestHelper";
import { DatabaseImporter } from "@spt-aki/utils/DatabaseImporter"
import * as baseJson from "../db/trader/allitemsonline/base.json";
import { BundleLoader } from "@spt-aki/loaders/BundleLoader";
//
class Mod implements IPreAkiLoadMod {
    private static container: DependencyContainer;
    public preAkiLoad(container: DependencyContainer): void {
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const preAkiModLoader = container.resolve("PreAkiModLoader");
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");
        this.setupTraderUpdateTime(traderConfig);
        const imageRouter = container.resolve<ImageRouter>("ImageRouter")
    }
    public postAkiLoad(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const FuncDatabaseImporter = container.resolve<DatabaseImporter>("DatabaseImporter")
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        const VFS = container.resolve<VFS>("VFS");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ModPath = PreAkiModLoader.getModPath("SeelesItemPack")
        const DB = FuncDatabaseImporter.loadRecursive(`${ModPath}db/`)
        const configServer = container.resolve<JsonUtil>("ConfigServer");
        const Invcfg = configServer.getConfig(ConfigTypes.INVENTORY);
        const DBLoot = DB.templates.randomloots
        const Config = JsonUtil.deserialize(VFS.readFile(`${ModPath}config.json`));
        var HandbookObj = {}
        for (var i = 0; i < ClientDB.templates.handbook.Items.length; i++) {
            HandbookObj[ClientDB.templates.handbook.Items[i].Id] = {}
            HandbookObj[ClientDB.templates.handbook.Items[i].Id].Id = ClientDB.templates.handbook.Items[i].Id
            HandbookObj[ClientDB.templates.handbook.Items[i].Id].ParentId = ClientDB.templates.handbook.Items[i].ParentId
        }
        for (let item in HandbookObj) {
        }
    }
    public postDBLoad(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const FuncDatabaseImporter = container.resolve<DatabaseImporter>("DatabaseImporter")
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        const VFS = container.resolve<VFS>("VFS");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const configServer = container.resolve<JsonUtil>("ConfigServer");
        const ClientDB = FuncDatabaseServer.getTables();
        const ModPath = PreAkiModLoader.getModPath("SeelesItemPack")
        const DB = FuncDatabaseImporter.loadRecursive(`${ModPath}db/`)
        const Config = JsonUtil.deserialize(VFS.readFile(`${ModPath}config.json`));
        const AllItems = ClientDB.templates.items;
        const Invcfg = configServer.getConfig(ConfigTypes.INVENTORY);
        const DBLoot = DB.templates.randomloots
        const Pack = JsonUtil.deserialize(VFS.readFile(`${ModPath}package.json`));
        const version = Pack.version
        //CustomLog(JSON.stringify(Invcfg, null, 4))
        var Therapist = "54cb57776803fa99248b456e"
        var AssortData = ClientDB.traders[Therapist].assort
        const BotReshala = ClientDB.bots.types.bossbully
        const BotSanitar = ClientDB.bots.types.bosssanitar
        const BotKnight = ClientDB.bots.types.bossknight
        const BotGlukhar = ClientDB.bots.types.bossgluhar
        const BotShturman = ClientDB.bots.types.bosskojaniy
        const BotKilla = ClientDB.bots.types.bosskilla
        const BotTagilla = ClientDB.bots.types.bosstagilla
        const BotBigPipe = ClientDB.bots.types.followerbigpipe
        const BotBirdEye = ClientDB.bots.types.followerbirdeye
        const Locale = ClientDB.locales.global["ch"]
        const ELocale = ClientDB.locales.global["en"]
        const ClientQuest = DB.templates.templates.quests
        const ClientItems = DB.templates.templates.items
        const ClientTrader = DB.templates.traders
        for (let preset in DB.Preset) {
            var id = DB.Preset[preset].ID
            ClientDB.globals.ItemPresets[id] = DB.Preset[preset].Preset
        }
        for (let rd in DBLoot) {
            Invcfg.randomLootContainers[rd] = DBLoot[rd]
            for (let it in DBLoot[rd].rewardTplPool) {
                //CustomAccess(Locale[it + " Name"])
            }
        }
        async function checkUpdate(url, version) {
            let timeout = 5000;
            let currentVersion = version;

            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.timeout = timeout;

                xhr.ontimeout = function () {
                    console.error(`Request timed out after ${timeout} milliseconds.`);
                    reject(`Request timed out after ${timeout} milliseconds.`);
                };

                xhr.onreadystatechange = function () {
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        let responseVersion = xhr.responseText.trim();
                        if (responseVersion !== currentVersion) {
                            console.log(`Current version: ${currentVersion}. New version: ${responseVersion}.`);
                            resolve({ currentVersion, responseVersion });
                        } else {
                            console.log(`Current version (${currentVersion}) is up-to-date.`);
                            resolve(null);
                        }
                    }
                };

                xhr.send();
            });
        }
        checkUpdate("https://example.com/version.txt", version)
            .then((result) => {
                if (result) {
                    // handle the update
                } else {
                    // do nothing
                }
            })
            .catch((error) => {
                console.error(error);
            });
        //CustomLog(JSON.stringify(Invcfg, null, 4))
        for (let item in ClientItems) {
            if (Locale[ClientItems[item]._id + " Name"] != undefined) {
                if (ClientItems[item]._props.Prefab) {
                    if (ClientItems[item]._props.Prefab.path != "") {
                        var AssortData2 = DB.trader["allitemsonline"].assort
                        var ItemData = ClientItems[item]
                        var CacheHashID = GenerateHash(ItemData._id)
                        AssortData2.items.push({
                            "_id": CacheHashID,
                            "_tpl": ItemData._id,
                            "parentId": "hideout",
                            "slotId": "hideout",
                            "upd": {
                                "StackObjectsCount": 99999,
                                "UnlimitedCount": true
                            }
                        })
                        AssortData2.barter_scheme[CacheHashID] = [[{
                            count: 1,
                            _tpl: "5449016a4bdc2d6f028b456f"
                        }]]
                        AssortData2.loyal_level_items[CacheHashID] = 1
                        ClientDB.templates.items[item]._props.ExaminedByDefault = true
                        //ClientDB.traders["allitemsonline"].assort
                    }
                }
            }
        }
        VFS.writeFile(`${ModPath}assort.json`, JSON.stringify(AssortData2, null, 4))
        for (let trader in DB.trader) {
            ClientDB.traders[trader] = DB.trader[trader]
            var TraderBase = DB.trader[trader].base
            var TraderID = TraderBase._id
            Locale[TraderID + " FullName"] = TraderBase.surname
            Locale[TraderID + " FirstName"] = TraderBase.name
            Locale[TraderID + " Nickname"] = TraderBase.nickname
            Locale[TraderID + " Location"] = TraderBase.location
            Locale[TraderID + " Description"] = TraderBase.description
            ELocale[TraderID + " FullName"] = TraderBase.surname
            ELocale[TraderID + " FirstName"] = TraderBase.name
            ELocale[TraderID + " Nickname"] = TraderBase.nickname
            ELocale[TraderID + " Location"] = TraderBase.location
            ELocale[TraderID + " Description"] = TraderBase.description
        }
        for (let item in DB.templates.items) {
            var Local = ClientDB.locales.global["ch"]
            var ItemData = DB.templates.items[item]
            ClientDB.templates.items[item] = DB.templates.items[item]
            ClientDB.templates.items[item] = DB.templates.items[item]
            Local[ItemData._id + " Name"] = ItemData._props.Name
            Local[ItemData._id + " ShortName"] = ItemData._props.ShortName
            Local[ItemData._id + " Description"] = ItemData._props.Description
            ClientDB.templates.handbook.Items.push({
                "Id": ItemData._id,
                "ParentId": ItemData._props.RagfairType,
                "Price": ItemData._props.DefaultPrice
            })
            var CacheHashID = GenerateHash(ItemData._id)
            AssortData.items.push({
                "_id": CacheHashID,
                "_tpl": ItemData._id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "StackObjectsCount": 99999,
                    "UnlimitedCount": true
                }
            })
            AssortData.barter_scheme[CacheHashID] = [[{
                count: ItemData._props.DefaultPrice,
                _tpl: '5449016a4bdc2d6f028b456f'
            }]]
            AssortData.loyal_level_items[CacheHashID] = 1
            Logger.info("????????????????????????: " + ItemData._props.Name)
        }
        for (let item in DB.templates.lotofguns) {
            var Local = ClientDB.locales.global["ch"]
            var ItemData = DB.templates.lotofguns[item]
            ClientDB.templates.items[item] = DB.templates.lotofguns[item]
            ClientDB.templates.items[item] = DB.templates.lotofguns[item]
            Local[ItemData._id + " Name"] = ItemData._props.Name
            Local[ItemData._id + " ShortName"] = ItemData._props.ShortName
            Local[ItemData._id + " Description"] = ItemData._props.Description
            ClientDB.templates.handbook.Items.push({
                "Id": ItemData._id,
                "ParentId": ItemData._props.RagfairType,
                "Price": ItemData._props.DefaultPrice
            })
            if (Config.PartsSell == true) {
                var CacheHashID = GenerateHash(ItemData._id)
                AssortData.items.push({
                    "_id": CacheHashID,
                    "_tpl": ItemData._id,
                    "parentId": "hideout",
                    "slotId": "hideout",
                    "upd": {
                        "StackObjectsCount": 99999,
                        "UnlimitedCount": true
                    }
                })
                AssortData.barter_scheme[CacheHashID] = [[{
                    count: ItemData._props.DefaultPrice,
                    _tpl: '5449016a4bdc2d6f028b456f'
                }]]
                AssortData.loyal_level_items[CacheHashID] = 1
                Logger.info("????????????????????????: " + ItemData._props.Name)
            }
        }
        for (var i = 0; i < DB.templates.assortitems.items.length; i++) {
            AssortData.items.push(DB.templates.assortitems.items[i])
        }
        for (let ba in DB.templates.assortitems.barter_scheme) {
            AssortData.barter_scheme[ba] = DB.templates.assortitems.barter_scheme[ba]
        }
        for (let lly in DB.templates.assortitems.loyal_level_items) {
            AssortData.loyal_level_items[lly] = DB.templates.assortitems.loyal_level_items[lly]
        }
        var MedicKitPlus = { Trigger: false };
        if (MedicKitPlus.Trigger == true) {
            var AFAK = ClientDB.templates.items["60098ad7c2240c0fe85c570a"]
            var Salewa = ClientDB.templates.items["544fb45d4bdc2dee738b4568"]
            var IFAK = ClientDB.templates.items["590c678286f77426c9660122"]
            var CarMedicKit = ClientDB.templates.items["590c661e86f7741e566b646a"]
            var Grizzly = ClientDB.templates.items["590c657e86f77412b013051d"]
            //AFAK
            AFAK._props.MaxHpResource = AFAK._props.MaxHpResource * 10
            AFAK._props.hpResourceRate = AFAK._props.hpResourceRate * 10
            //Salewa
            Salewa._props.MaxHpResource = Salewa._props.MaxHpResource * 10
            Salewa._props.hpResourceRate = Salewa._props.hpResourceRate * 10
            //IFAK
            IFAK._props.MaxHpResource = IFAK._props.MaxHpResource * 10
            IFAK._props.hpResourceRate = IFAK._props.hpResourceRate * 10
            //CarMedicKit
            CarMedicKit._props.MaxHpResource = CarMedicKit._props.MaxHpResource * 10
            CarMedicKit._props.hpResourceRate = CarMedicKit._props.hpResourceRate * 10
            //Grizzly
            Grizzly._props.MaxHpResource = Grizzly._props.MaxHpResource * 10
            Grizzly._props.hpResourceRate = Grizzly._props.hpResourceRate * 10
        }
        //?????????????????????
        var QuestObj = {}
        var AssortObj = {}
        //????????????????????????????????????
        for (let quest in ClientQuest) {
            var QuestID = ClientQuest[quest]._id
            var StartArr = ClientQuest[quest].conditions.AvailableForStart
            var FinishArr = ClientQuest[quest].conditions.AvailableForFinish
            try {
                QuestObj[ClientQuest[quest]._id] = {}
                QuestObj[ClientQuest[quest]._id]._id = ClientQuest[quest]._id
                QuestObj[ClientQuest[quest]._id].name = Locale[ClientQuest[quest]._id + " name"]
                QuestObj[ClientQuest[quest]._id].description = Locale[ClientQuest[quest]._id + " description"]
                QuestObj[ClientQuest[quest]._id].traderid = ClientQuest[quest].traderId
                QuestObj[ClientQuest[quest]._id].tradername = Locale[ClientQuest[quest].traderId + " Nickname"]
                QuestObj[ClientQuest[quest]._id].conditions = {}
                QuestObj[ClientQuest[quest]._id].conditions.Prequest = {}
                QuestObj[ClientQuest[quest]._id].conditions.Level = {}
                QuestObj[ClientQuest[quest]._id].conditions.Loyalty = {}
                QuestObj[ClientQuest[quest]._id].conditions.Items = {}
                QuestObj[ClientQuest[quest]._id].conditions.Assembly = {}
                QuestObj[ClientQuest[quest]._id].conditions.Unlock = {}
            }
            catch (err) {
                CustomLog(err.message)
                CustomLog("QuestName: " + Locale[ClientQuest[quest]._id + " name"])
                CustomLog("QuestID: " + ClientQuest[quest]._id)
                CustomLog("ConditionType: Quest")
            }
        }
        //?????????????????????????????????
        for (let quest in ClientQuest) {
            var StartArr = ClientQuest[quest].conditions.AvailableForStart
            var FinishArr = ClientQuest[quest].conditions.AvailableForFinish
            var QuestID = ClientQuest[quest]._id
            if (StartArr.length > 0) {
                for (var i = 0; i < StartArr.length; i++) {
                    switch (StartArr[i]._parent) {
                        //??????????????????
                        case "Quest": {
                            try {
                                QuestObj[ClientQuest[quest]._id].conditions.Prequest[StartArr[i]._props.target] = {}
                                QuestObj[ClientQuest[quest]._id].conditions.Prequest[StartArr[i]._props.target]._id = StartArr[i]._props.target
                                QuestObj[ClientQuest[quest]._id].conditions.Prequest[StartArr[i]._props.target].name = Locale[StartArr[i]._props.target + " name"]
                                QuestObj[ClientQuest[quest]._id].conditions.Prequest[StartArr[i]._props.target].traderid = ClientQuest[StartArr[i]._props.target].traderId
                                QuestObj[ClientQuest[quest]._id].conditions.Prequest[StartArr[i]._props.target].tradername = Locale[ClientQuest[StartArr[i]._props.target].traderId + " Nickname"]
                                QuestObj[ClientQuest[quest]._id].conditions.Prequest[StartArr[i]._props.target].status = StartArr[i]._props.status[0]
                                QuestObj[StartArr[i]._props.target].conditions.Unlock[QuestID] = {}
                                QuestObj[StartArr[i]._props.target].conditions.Unlock[QuestID]._id = ClientQuest[QuestID]._id
                                QuestObj[StartArr[i]._props.target].conditions.Unlock[QuestID].name = Locale[ClientQuest[QuestID]._id + " name"]
                                QuestObj[StartArr[i]._props.target].conditions.Unlock[QuestID].traderid = ClientQuest[QuestID].traderId
                                QuestObj[StartArr[i]._props.target].conditions.Unlock[QuestID].tradername = Locale[ClientQuest[QuestID].traderId + " Nickname"]
                            }
                            catch (err) {
                                CustomLog(err.message)
                                CustomLog("QuestName: " + Locale[ClientQuest[quest]._id + " name"])
                                CustomLog("QuestID: " + ClientQuest[quest]._id)
                                CustomLog("ConditionType: Quest")
                            }
                        };
                            break;
                        //???????????????????????????
                        case "TraderLoyalty": {
                            try {
                                QuestObj[ClientQuest[quest]._id].conditions.Loyalty[StartArr[i]._props.target] = {}
                                QuestObj[ClientQuest[quest]._id].conditions.Loyalty[StartArr[i]._props.target]._id = StartArr[i]._props.target
                                QuestObj[ClientQuest[quest]._id].conditions.Loyalty[StartArr[i]._props.target].name = Locale[StartArr[i]._props.target + " Nickname"]
                                QuestObj[ClientQuest[quest]._id].conditions.Loyalty[StartArr[i]._props.target].require = StartArr[i]._props.compareMethod
                                QuestObj[ClientQuest[quest]._id].conditions.Loyalty[StartArr[i]._props.target].value = StartArr[i]._props.value
                            }
                            catch (err) {
                                CustomLog(err.message)
                                CustomLog("QuestName: " + Locale[ClientQuest[quest]._id + " name"])
                                CustomLog("QuestID: " + ClientQuest[quest]._id)
                                CustomLog("ConditionType: TraderLoyalty")
                            }
                        };
                            break;
                        //??????????????????
                        case "Level": {
                            try {
                                QuestObj[ClientQuest[quest]._id].conditions.Level["LevelNeed"] = {}
                                QuestObj[ClientQuest[quest]._id].conditions.Level["LevelNeed"].level = StartArr[i]._props.value
                                QuestObj[ClientQuest[quest]._id].conditions.Level["LevelNeed"].require = StartArr[i]._props.compareMethod
                            }
                            catch (err) {
                                CustomLog(err.message)
                                CustomLog("QuestName: " + Locale[ClientQuest[quest]._id + " name"])
                                CustomLog("QuestID: " + ClientQuest[quest]._id)
                                CustomLog("ConditionType: Level")
                            }
                        }
                    }
                }
            }
            if (FinishArr.length > 0) {
                for (var j = 0; j < FinishArr.length; j++) {
                    switch (FinishArr[j]._parent) {
                        //????????????????????????
                        case "HandoverItem": {
                            try {
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]] = {}
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]]._id = FinishArr[j]._props.target[0]
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].name = Locale[FinishArr[j]._props.target[0] + " Name"]
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].description = Locale[FinishArr[j]._props.target[0] + " Description"]
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].count = parseInt(FinishArr[j]._props.value)
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].type = FinishArr[j]._parent
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].onlyFindInRaid = FinishArr[j]._props.onlyFoundInRaid
                                if (ClientItems[FinishArr[j]._props.target[0]] != undefined) {
                                    QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].isQuestItem = ClientItems[FinishArr[j]._props.target[0]]._props.QuestItem
                                }
                                else {
                                    QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].isQuestItem = false
                                    //ErrIDArr.push(FinishArr[j]._props.target[0])
                                }
                            }
                            catch (err) {
                                CustomLog(err.message)
                                CustomLog("QuestName: " + Locale[ClientQuest[quest]._id + " name"])
                                CustomLog("QuestID: " + ClientQuest[quest]._id)
                                CustomLog("ConditionType: HandoverItem")
                            }
                        };
                        //????????????????????????
                        case "LeaveItemAtLocation": {
                            try {
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]] = {}
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]]._id = FinishArr[j]._props.target[0]
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].name = Locale[FinishArr[j]._props.target[0] + " Name"]
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].description = Locale[FinishArr[j]._props.target[0] + " Description"]
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].count = parseInt(FinishArr[j]._props.value)
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].type = FinishArr[j]._parent
                                QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].onlyFindInRaid = FinishArr[j]._props.onlyFoundInRaid
                                if (ClientItems[FinishArr[j]._props.target[0]] != undefined) {
                                    QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].isQuestItem = ClientItems[FinishArr[j]._props.target[0]]._props.QuestItem
                                }
                                else {
                                    QuestObj[ClientQuest[quest]._id].conditions.Items[FinishArr[j]._props.target[0]].isQuestItem = false
                                    //ErrIDArr.push(FinishArr[j]._props.target[0])
                                }
                            }
                            catch (err) {
                                CustomLog(err.message)
                                CustomLog("QuestName: " + Locale[ClientQuest[quest]._id + " name"])
                                CustomLog("QuestID: " + ClientQuest[quest]._id)
                                CustomLog("ConditionType: LeaveItemAtLocation")
                            }
                        };
                            break;
                            break;
                        //??????????????????
                        case "WeaponAssembly": {
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]] = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]]._id = FinishArr[j]._props.target[0]
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].name = Locale[FinishArr[j]._props.target[0] + " Name"]
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Accuracy = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Accuracy.name = "?????????MOA???"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Accuracy.value = FinishArr[j]._props.baseAccuracy.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Accuracy.require = FinishArr[j]._props.baseAccuracy.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Durability = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Durability.name = "??????"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Durability.value = FinishArr[j]._props.durability.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Durability.require = FinishArr[j]._props.durability.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Distance = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Distance.name = "????????????"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Distance.value = FinishArr[j]._props.effectiveDistance.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Distance.require = FinishArr[j]._props.effectiveDistance.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Ergonomics = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Ergonomics.name = "????????????"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Ergonomics.value = FinishArr[j]._props.ergonomics.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Ergonomics.require = FinishArr[j]._props.ergonomics.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Height = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Height.name = "??????"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Height.value = FinishArr[j]._props.height.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Height.require = FinishArr[j]._props.height.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Width = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Width.name = "??????"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Width.value = FinishArr[j]._props.width.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Width.require = FinishArr[j]._props.width.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.MagCount = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.MagCount.name = "????????????"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.MagCount.value = FinishArr[j]._props.magazineCapacity.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.MagCount.require = FinishArr[j]._props.magazineCapacity.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Speed = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Speed.name = "????????????"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Speed.value = FinishArr[j]._props.muzzleVelocity.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Speed.require = FinishArr[j]._props.muzzleVelocity.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Recoil = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Recoil.name = "?????????"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Recoil.value = FinishArr[j]._props.recoil.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Recoil.require = FinishArr[j]._props.recoil.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Weight = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Weight.name = "??????"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Weight.value = FinishArr[j]._props.weight.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Weight.require = FinishArr[j]._props.weight.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.containItem = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.containItem.name = "????????????/??????"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.containItem.item = FinishArr[j]._props.containsItems
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.containItem.Tag = FinishArr[j]._props.hasItemFromCategory

                        }
                    }
                }
            }
        }
        //??????????????????
        for (let trader in ClientTrader) {
            if (ClientTrader[trader].assort && ClientTrader[trader].assort.items.length > 0) {
                var Trader = ClientTrader[trader]
                AssortObj[trader] = {}
                AssortObj[trader].Name = Locale[Trader.base._id + " Nickname"]
                AssortObj[trader].Item = {}
                for (var i = 0; i < Trader.assort.items.length; i++) {
                    if (Trader.assort.items[i].parentId == "hideout") {
                        var aotid = Trader.assort.items[i]._id
                        AssortObj[trader].Item[aotid] = {}
                        AssortObj[trader].Item[aotid].id = aotid
                        AssortObj[trader].Item[aotid].target = Trader.assort.items[i]._tpl
                        AssortObj[trader].Item[aotid].name = Locale[Trader.assort.items[i]._tpl + " Name"]
                        AssortObj[trader].Item[aotid].type = "Exchange"
                        AssortObj[trader].Item[aotid].unlock = "None"
                        AssortObj[trader].Item[aotid].level = Trader.assort.loyal_level_items[aotid]
                        AssortObj[trader].Item[aotid].limit = "None"
                        AssortObj[trader].Item[aotid].limitcount = 0
                        if (Trader.assort.items[i].upd.BuyRestrictionMax) {
                            AssortObj[trader].Item[aotid].limit = "Limit"
                            AssortObj[trader].Item[aotid].limitcount = Trader.assort.items[i].upd.BuyRestrictionMax
                        }
                        AssortObj[trader].Item[aotid].list = {}
                        AssortObj[trader].Item[aotid].cost = {}
                        AssortObj[trader].Item[aotid].quest = {}
                        for (var j = 0; j < Trader.assort.barter_scheme[aotid][0].length; j++) {
                            var Bt = Trader.assort.barter_scheme[aotid][0][j]
                            var BT = Trader.assort.barter_scheme[aotid][0]
                            AssortObj[trader].Item[aotid].list[Bt._tpl] = {}
                            AssortObj[trader].Item[aotid].list[Bt._tpl].id = Bt._tpl
                            AssortObj[trader].Item[aotid].list[Bt._tpl].name = Locale[Bt._tpl + " Name"]
                            AssortObj[trader].Item[aotid].list[Bt._tpl].count = Bt.count
                            if (Bt._tpl == "5449016a4bdc2d6f028b456f" || Bt._tpl == "5696686a4bdc2da3298b456a" || Bt._tpl == "569668774bdc2da2298b4568") {
                                AssortObj[trader].Item[aotid].type = "Buyout"
                                AssortObj[trader].Item[aotid].cost.id = Bt._tpl
                                AssortObj[trader].Item[aotid].cost.name = Locale[Bt._tpl + " Name"]
                                AssortObj[trader].Item[aotid].cost.count = Bt.count
                            }
                        }
                    }
                    if (Trader.questassort) {
                        for (let sc in Trader.questassort.success) {
                            var qt = Trader.questassort.success[sc]
                            if (sc == aotid) {
                                AssortObj[trader].Item[aotid].unlock = "Quest"
                                AssortObj[trader].Item[aotid].quest.id = qt
                                AssortObj[trader].Item[aotid].quest.name = Locale[qt + " name"]
                                AssortObj[trader].Item[aotid].quest.tradername = Locale[ClientQuest[qt].traderId + " Nickname"]
                            }
                        }
                    }
                }
            }
        }
        //????????????
        VFS.writeFile(`${ModPath}asCache.json`, JSON.stringify(AssortObj, null, 4))
        VFS.writeFile(`${ModPath}QuestCache.json`, JSON.stringify(QuestObj, null, 4))
        CustomLog("File Write Finished.")
        const QuestJson = JsonUtil.deserialize(VFS.readFile(`${ModPath}QuestCache.json`));
        const AssortJson = JsonUtil.deserialize(VFS.readFile(`${ModPath}asCache.json`));
        //????????????????????????
        var data = {}
        data["mod"] = "???????????????????????????????????????"
        data["author"] = "Hidden"
        data["brief"] = "???????????????????????????????????????"
        data["comment"] = "???????????????????????????????????????"
        data["helpdoc"] = {}
        data["helpdoc"]["????????????"] = "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n??????????????????????????????\n0.13.0.2.27134\n??????????????????????????????\nSPT-AKI-BleedingEdge-3.5.0\nUpdate02032023"
        for (let item in ClientItems) {
            var itarr = []
            var itarr2 = []
            var itstr = ""
            var itemid = ClientItems[item]._id
            for (let td in AssortJson) {
                for (let it in AssortJson[td].Item) {
                    var It = AssortJson[td].Item[it]
                    if (It.target == itemid) {
                        switch (It.type) {
                            case "Buyout": {
                                switch (It.limit) {
                                    case "Limit": {
                                        switch (It.unlock) {
                                            case "Quest": {
                                                itarr.push("\n???????????????" + AssortJson[td].Name + "???????????????" + "\n???????????? " + It.cost.name + "\n???????????? " + It.cost.count + "\n?????????????????? " + It.level + "\n???????????? " + It.limitcount + "\n?????????????????? " + It.quest.name + "(" + It.quest.tradername + ")")
                                            }
                                                break
                                            case "None": {
                                                itarr.push("\n???????????????" + AssortJson[td].Name + "???????????????" + "\n???????????? " + It.cost.name + "\n???????????? " + It.cost.count + "\n?????????????????? " + It.level + "\n???????????? " + It.limitcount)
                                            }
                                                break
                                        }
                                    }
                                        break
                                    case "None": {
                                        switch (It.unlock) {
                                            case "Quest": {
                                                itarr.push("\n???????????????" + AssortJson[td].Name + "???????????????" + "\n???????????? " + It.cost.name + "\n???????????? " + It.cost.count + "\n?????????????????? " + It.level + "\n?????????????????? " + It.quest.name + "(" + It.quest.tradername + ")")
                                            }
                                                break
                                            case "None": {
                                                itarr.push("\n???????????????" + AssortJson[td].Name + "???????????????" + "\n???????????? " + It.cost.name + "\n???????????? " + It.cost.count + "\n?????????????????? " + It.level)
                                            }
                                                break
                                        }
                                    }
                                        break
                                }
                            }
                                break
                            case "Exchange": {
                                switch (It.limit) {
                                    case "Limit": {
                                        switch (It.unlock) {
                                            case "Quest": {
                                                var itstr2 = "\n???????????????" + AssortJson[td].Name + "?????????" + "\n????????????: "
                                                for (let it2 in It.list) {
                                                    itarr2.push("\n" + It.list[it2].name + " x" + It.list[it2].count)
                                                }
                                                for (var i = 0; i < itarr2.length; i++) {
                                                    itstr2 += itarr2[i]
                                                }
                                                itstr2 += "\n?????????????????? " + It.level + "\n???????????? " + It.limitcount + "\n?????????????????? " + It.quest.name + "(" + It.quest.tradername + ")"
                                                itarr.push(itstr2)
                                                itstr2 = ""
                                                itarr2 = []
                                            }
                                                break
                                            case "None": {
                                                var itstr2 = "\n???????????????" + AssortJson[td].Name + "?????????" + "\n????????????: "
                                                for (let it2 in It.list) {
                                                    itarr2.push("\n" + It.list[it2].name + " x" + It.list[it2].count)
                                                }
                                                for (var i = 0; i < itarr2.length; i++) {
                                                    itstr2 += itarr2[i]
                                                }
                                                itstr2 += "\n?????????????????? " + It.level + "\n???????????? " + It.limitcount
                                                itarr.push(itstr2)
                                                itstr2 = ""
                                                itarr2 = []
                                            }
                                                break
                                        }
                                    }
                                        break
                                    case "None": {
                                        switch (It.unlock) {
                                            case "Quest": {
                                                var itstr2 = "\n???????????????" + AssortJson[td].Name + "?????????" + "\n????????????: "
                                                for (let it2 in It.list) {
                                                    itarr2.push("\n" + It.list[it2].name + " x" + It.list[it2].count)
                                                }
                                                for (var i = 0; i < itarr2.length; i++) {
                                                    itstr2 += itarr2[i]
                                                }
                                                itstr2 += "\n?????????????????? " + It.level + "\n?????????????????? " + It.quest.name + "(" + It.quest.tradername + ")"
                                                itarr.push(itstr2)
                                                itstr2 = ""
                                                itarr2 = []
                                            }
                                                break
                                            case "None": {
                                                var itstr2 = "\n???????????????" + AssortJson[td].Name + "?????????" + "\n????????????: "
                                                for (let it2 in It.list) {
                                                    itarr2.push("\n" + It.list[it2].name + " x" + It.list[it2].count)
                                                }
                                                for (var i = 0; i < itarr2.length; i++) {
                                                    itstr2 += itarr2[i]
                                                }
                                                itstr2 += "\n?????????????????? " + It.level
                                                itarr.push(itstr2)
                                                itstr2 = ""
                                                itarr2 = []
                                            }
                                                break
                                        }
                                    }
                                        break
                                }
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < itarr.length; i++) {
                itstr = itstr + itarr[i]
            }
            if (itstr != "") {
                if (modparent(itemid, 6) != "5448fe124bdc2da5018b4567") {
                    data["helpdoc"]["???????????? " + Locale[itemid + " Name"]] = Locale[itemid + " Name"] + itstr
                    itstr = ""
                    itarr = []
                }
            }
        }
        VFS.writeFile(`${ModPath}??????????????????.json`, JSON.stringify(data, null, 4))
        //????????????????????????
        var data2 = {}
        data2["mod"] = "?????????????????????????????????"
        data2["author"] = "Hidden"
        data2["brief"] = "?????????????????????????????????"
        data2["comment"] = "?????????????????????????????????"
        data2["helpdoc"] = {}
        data2["helpdoc"]["????????????"] = "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n??????????????????????????????\n0.13.0.2.27134\n??????????????????????????????\nSPT-AKI-BleedingEdge-3.5.0\nUpdate02032023"
        for (let item in ClientItems) {
            var itarr = []
            var itarr2 = []
            var itstr = ""
            var itemid = ClientItems[item]._id
            for (let td in AssortJson) {
                for (let it in AssortJson[td].Item) {
                    var It = AssortJson[td].Item[it]
                    switch (It.type) {
                        case "Exchange": {
                            switch (It.limit) {
                                case "Limit": {
                                    switch (It.unlock) {
                                        case "Quest": {
                                            for (let it2 in It.list) {
                                                if (It.list[it2].id == itemid) {
                                                    var str2 = "\n???????????????" + AssortJson[td].Name + "????????? " + It.name + "\n????????????: "
                                                    var arr2 = []
                                                    for (let it3 in It.list) {
                                                        arr2.push("\n" + It.list[it3].name + " x" + It.list[it3].count)
                                                    }
                                                    for (var i = 0; i < arr2.length; i++) {
                                                        str2 += arr2[i]
                                                    }
                                                    str2 += "\n?????????????????? " + It.level + "\n?????????????????? " + It.quest.name + "(" + It.quest.tradername + ")" + "\n???????????? " + It.limitcount
                                                    itarr.push(str2)
                                                    str2 = ""
                                                    arr2 = []
                                                }
                                            }
                                        }
                                            break
                                        case "None": {
                                            for (let it2 in It.list) {
                                                if (It.list[it2].id == itemid) {
                                                    var str2 = "\n???????????????" + AssortJson[td].Name + "????????? " + It.name + "\n????????????: "
                                                    var arr2 = []
                                                    for (let it3 in It.list) {
                                                        arr2.push("\n" + It.list[it3].name + " x" + It.list[it3].count)
                                                    }
                                                    for (var i = 0; i < arr2.length; i++) {
                                                        str2 += arr2[i]
                                                    }
                                                    str2 += "\n?????????????????? " + It.level + "\n???????????? " + It.limitcount
                                                    itarr.push(str2)
                                                    str2 = ""
                                                    arr2 = []
                                                }
                                            }
                                        }
                                            break
                                    }
                                }
                                    break
                                case "None": {
                                    switch (It.unlock) {
                                        case "Quest": {
                                            for (let it2 in It.list) {
                                                if (It.list[it2].id == itemid) {
                                                    var str2 = "\n???????????????" + AssortJson[td].Name + "????????? " + It.name + "\n????????????: "
                                                    var arr2 = []
                                                    for (let it3 in It.list) {
                                                        arr2.push("\n" + It.list[it3].name + " x" + It.list[it3].count)
                                                    }
                                                    for (var i = 0; i < arr2.length; i++) {
                                                        str2 += arr2[i]
                                                    }
                                                    str2 += "\n?????????????????? " + It.level + "\n?????????????????? " + It.quest.name + "(" + It.quest.tradername + ")"
                                                    itarr.push(str2)
                                                    str2 = ""
                                                    arr2 = []
                                                }
                                            }
                                        }
                                            break
                                        case "None": {
                                            for (let it2 in It.list) {
                                                if (It.list[it2].id == itemid) {
                                                    var str2 = "\n???????????????" + AssortJson[td].Name + "????????? " + It.name + "\n????????????: "
                                                    var arr2 = []
                                                    for (let it3 in It.list) {
                                                        arr2.push("\n" + It.list[it3].name + " x" + It.list[it3].count)
                                                    }
                                                    for (var i = 0; i < arr2.length; i++) {
                                                        str2 += arr2[i]
                                                    }
                                                    str2 += "\n?????????????????? " + It.level
                                                    itarr.push(str2)
                                                    str2 = ""
                                                    arr2 = []
                                                }
                                            }
                                        }
                                            break
                                    }
                                }
                                    break
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < itarr.length; i++) {
                itstr = itstr + itarr[i]
            }
            if (itstr != "") {
                if (modparent(itemid, 6) != "5448fe124bdc2da5018b4567") {
                    data2["helpdoc"]["???????????? " + Locale[itemid + " Name"]] = Locale[itemid + " Name"] + itstr
                    itstr = ""
                    itarr = []
                }
            }
        }
        VFS.writeFile(`${ModPath}??????????????????.json`, JSON.stringify(data2, null, 4))
        //??????????????????(????????????)
        for (let item in ClientItems) {
            var itarr = []
            var itstr = ""
            var itemid = ClientItems[item]._id
            for (let qt in QuestJson) {
                for (let item2 in QuestJson[qt].conditions.Items) {
                    var ct = QuestJson[qt].conditions.Items[item2]
                    if (ct._id == itemid && (ct._id != ("5449016a4bdc2d6f028b456f" || "5696686a4bdc2da3298b456a" || "569668774bdc2da2298b4568"))) {
                        switch (ct.type) {
                            case "HandoverItem": {
                                switch (ct.onlyFindInRaid) {
                                    case true: {
                                        itarr.push("\n" + QuestJson[qt].tradername + "????????? " + QuestJson[qt].name + " ????????????" + ct.count + "?????????????????????????????????")
                                    };
                                        break;
                                    case false: {
                                        itarr.push("\n" + QuestJson[qt].tradername + "????????? " + QuestJson[qt].name + " ????????????" + ct.count + "????????????")
                                    };
                                        break;
                                }
                            };
                                break;
                            case "LeaveItemAtLocation": {
                                itarr.push("\n" + QuestJson[qt].tradername + "????????? " + QuestJson[qt].name + " ???????????????????????????" + ct.count + "????????????")
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < itarr.length; i++) {
                if (!ClientItems[item]._props.QuestItem) {
                    itstr = itstr + itarr[i]
                }
            }
            if (itstr != "") {
                itstr = ""
                itarr = []
            }
        }
        function GenerateHash(string) {
            const shasum = crypto.createHash("sha1");
            shasum.update(string);
            return shasum.digest("hex").substring(0, 24);
        }
        function CustomLog(string) {
            Logger.logWithColor("[Console]: " + string, "yellow");
        }
        function CustomAccess(string) {
            Logger.logWithColor("[Console]: " + string, "green");
        }
        function CustomDenied(string) {
            Logger.logWithColor("[Console]: " + string, "red");
        }
        function AddAssort(trader, id, price, ll) {
            var AssortData1 = ClientDB.traders[trader].assort
            var CacheHashID = GenerateHash(id)
            AssortData1.items.push({
                "_id": CacheHashID,
                "_tpl": id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "StackObjectsCount": 99999,
                    "UnlimitedCount": true
                }
            })
            AssortData1.barter_scheme[CacheHashID] = [[{
                count: price,
                _tpl: '5449016a4bdc2d6f028b456f'
            }]]
            AssortData1.loyal_level_items[CacheHashID] = ll
        }
        function checkblacklist(string, array) {
            return array.includes(string)
        }
        function modparent(id, level) {
            var parent = ClientItems[id]._parent
            var id2 = ""
            for (var i = 0; i < level - 1; i++) {
                id = ClientItems[id]._parent
                if (id != "") {
                    parent = ClientItems[id]._parent
                    if (parent == "5448fe124bdc2da5018b4567") {
                        break
                    }
                }
                else {
                    return parent
                }
            }
            return parent
        }
        function getprice(id) {
            return ClientDB.templates.price[id]
        }
        AddAssort(Therapist, "5a29357286f77409c705e025", 1, 1)
    }
    private setupTraderUpdateTime(traderConfig: ITraderConfig): void {
        const traderRefreshRecord: UpdateTime = { traderId: baseJson._id, seconds: 3600 }
        traderConfig.updateTime.push(traderRefreshRecord);
    }
}
module.exports = { mod: new Mod() }