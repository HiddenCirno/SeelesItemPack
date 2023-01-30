import { DependencyContainer } from "tsyringe";
import crypto from "crypto";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { IModLoader } from "@spt-aki/models/spt/mod/IModLoader";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS"
import { DatabaseImporter } from "@spt-aki/utils/DatabaseImporter"
class Mod implements IPreAkiLoadMod {
    public preAkiLoad(container: DependencyContainer): void {
        return;
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
        const ClientDB = FuncDatabaseServer.getTables();
        const ModPath = PreAkiModLoader.getModPath("SeelesItemPack")
        const DB = FuncDatabaseImporter.loadRecursive(`${ModPath}db/`)
        const Config = JsonUtil.deserialize(VFS.readFile(`${ModPath}config.json`));
        const AllItems = ClientDB.templates.items;
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
        for (let preset in DB.Preset) {
            var id = DB.Preset[preset].ID
            ClientDB.globals.ItemPresets[id] = DB.Preset[preset].Preset
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
            Logger.info("物品数据加载成功: " + ItemData._props.Name)
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
                Logger.info("物品数据加载成功: " + ItemData._props.Name)
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
        const Locale = ClientDB.locales.global["ch"]
        const ELocale = ClientDB.locales.global["en"]
        const ClientQuest = DB.templates.quests
        const ClientItems = DB.templates.clientitem
        var docobj = {}
        docobj.mod = "EFTQuestData"
        docobj.author = "Hidden"
        docobj.brief = "EFTQuestData"
        docobj.comment = "EFTQuestData"
        docobj.helpdoc = {}
        for (let qt in DB.templates.quests) {
            var Quest = DB.templates.quests[qt]
            var FinishArr = Quest.conditions.AvailableForFinish
            var StarthArr = Quest.conditions.AvailableForStart
            var Name
            if (Locale[Quest._id + " name"]) {
                Name = Locale[Quest._id + " name"]
            }
            else Name = ELocale[Quest._id + " name"]
            var TraderName = Locale[Quest.traderId + " Nickname"]
            var fstrarr = []
            var fstr = ""
            if (FinishArr.length > 0) {
                for (var i = 0; i < FinishArr.length; i++) {
                    var fid = FinishArr[i]._props.id
                    fstrarr.push(Locale[fid] + " " + FinishArr[i]._props.value)
                }
                for (var i = 0; i < fstrarr.length; i++) {
                    fstr = fstr + "\n" + fstrarr[i]
                }
                docobj.helpdoc[Name] = Name + "（" + TraderName + "）" + fstr
                fstr = ""
            }
        }
        VFS.writeFile(`${ModPath}doc.json`, JSON.stringify(docobj, null, 4))
        var docobj2 = {}
        docobj2.mod = "EFTItemData"
        docobj2.author = "Hidden"
        docobj2.brief = "EFTItemData"
        docobj2.comment = "EFTItemData"
        docobj2.helpdoc = {}
        //初始化任务数据缓存
        var QuestObj = {}
        //初始化任务对象和基础信息
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
        //任务数据抽象处理、重构
        for (let quest in ClientQuest) {
            var StartArr = ClientQuest[quest].conditions.AvailableForStart
            var FinishArr = ClientQuest[quest].conditions.AvailableForFinish
            var QuestID = ClientQuest[quest]._id
            if (StartArr.length > 0) {
                for (var i = 0; i < StartArr.length; i++) {
                    switch (StartArr[i]._parent) {
                        //处理任务信息
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
                        //处理商人信任度信息
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
                        //处理等级信息
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
                        //处理上交物品信息
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
                        //处理埋设物品信息
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
                        //处理改枪要求
                        case "WeaponAssembly": {
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]] = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]]._id = FinishArr[j]._props.target[0]
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].name = Locale[FinishArr[j]._props.target[0] + " Name"]
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Accuracy = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Accuracy.name = "精度（MOA）"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Accuracy.value = FinishArr[j]._props.baseAccuracy.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Accuracy.require = FinishArr[j]._props.baseAccuracy.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Durability = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Durability.name = "耐久"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Durability.value = FinishArr[j]._props.durability.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Durability.require = FinishArr[j]._props.durability.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Distance = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Distance.name = "有效射程"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Distance.value = FinishArr[j]._props.effectiveDistance.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Distance.require = FinishArr[j]._props.effectiveDistance.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Ergonomics = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Ergonomics.name = "人机功效"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Ergonomics.value = FinishArr[j]._props.ergonomics.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Ergonomics.require = FinishArr[j]._props.ergonomics.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Height = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Height.name = "高度"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Height.value = FinishArr[j]._props.height.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Height.require = FinishArr[j]._props.height.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Width = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Width.name = "长度"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Width.value = FinishArr[j]._props.width.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Width.require = FinishArr[j]._props.width.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.MagCount = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.MagCount.name = "弹匣容量"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.MagCount.value = FinishArr[j]._props.magazineCapacity.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.MagCount.require = FinishArr[j]._props.magazineCapacity.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Speed = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Speed.name = "膛口初速"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Speed.value = FinishArr[j]._props.muzzleVelocity.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Speed.require = FinishArr[j]._props.muzzleVelocity.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Recoil = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Recoil.name = "后坐力"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Recoil.value = FinishArr[j]._props.recoil.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Recoil.require = FinishArr[j]._props.recoil.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Weight = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Weight.name = "重量"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Weight.value = FinishArr[j]._props.weight.value
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.Weight.require = FinishArr[j]._props.weight.compareMethod
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.containItem = {}
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.containItem.name = "包含物品/标签"
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.containItem.item = FinishArr[j]._props.containsItems
                            QuestObj[ClientQuest[quest]._id].conditions.Assembly[FinishArr[j]._props.target[0]].conditions.containItem.Tag = FinishArr[j]._props.hasItemFromCategory

                        }
                    }
                }
            }
        }
        VFS.writeFile(`${ModPath}QuestCache.json`, JSON.stringify(QuestObj, null, 4))
        const QuestJson = JsonUtil.deserialize(VFS.readFile(`${ModPath}QuestCache.json`));
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
                                        itarr.push("\n" + QuestJson[qt].tradername + "的任务 " + QuestJson[qt].name + " 需要上交" + ct.count + "个在战局中找到的此物品")
                                    };
                                        break;
                                    case false: {
                                        itarr.push("\n" + QuestJson[qt].tradername + "的任务 " + QuestJson[qt].name + " 需要交付" + ct.count + "个此物品")
                                    };
                                        break;
                                }
                            };
                                break;
                            case "LeaveItemAtLocation": {
                                itarr.push("\n" + QuestJson[qt].tradername + "的任务 " + QuestJson[qt].name + " 需要在指定地点安放" + ct.count + "个此物品")
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
                //var itstr2 = itstr.slice(0, -20) + "。\n"
                //CustomLog(Locale[itemid + " Name"] + itstr)
                docobj2.helpdoc[Locale[itemid + " Name"]] = Locale[itemid + " Name"] + itstr
                itstr = ""
                itarr = []
            }
        }
        VFS.writeFile(`${ModPath}doc2.json`, JSON.stringify(docobj2, null, 4))
        var bossobj = {}
        bossobj.mod = "EFTBossData"
        bossobj.author = "Hidden"
        bossobj.brief = "EFTBossData"
        bossobj.comment = "EFTBossData"
        bossobj.helpdoc = {}
        var health = 0
        for(let bot in ClientDB.bots.types){
            for(let bp in ClientDB.bots.types[bot].health.BodyParts[0]){
                var Part = ClientDB.bots.types[bot].health.BodyParts[0]
                health += ClientDB.bots.types[bot].health.BodyParts[0][bp].max
            }
            var str1 = "\n头部 " + Part.Head.max + "\n胸部 " + Part.Chest.max + "\n手部 " + Part.LeftArm.max + "\n胃部 " + Part.Stomach.max + "\n腿部 " + Part.RightLeg.max+ "\n总计 " + (Part.RightLeg.max * 2 + Part.LeftArm.max * 2 + Part.Head.max + Part.Chest.max + Part.Stomach.max)
            bossobj.helpdoc[bot] = str1
        }
        //VFS.writeFile(`${ModPath}bossobj.json`, JSON.stringify(bossobj, null, 4))
        var Ammoobj = {}
        Ammoobj.mod = "EFTAmmoData"
        Ammoobj.author = "Hidden"
        Ammoobj.brief = "EFTAmmoData"
        Ammoobj.comment = "EFTAmmoData"
        Ammoobj.helpdoc = {}
        for (let item in ClientItems) {
            if (ClientItems[item]._parent == "5485a8684bdc2da71d8b4567") {
                var str = "\n穿深 " + ClientItems[item]._props.PenetrationPower + "\n肉伤 " + ClientItems[item]._props.Damage + "\n甲伤 " + ClientItems[item]._props.ArmorDamage
                Ammoobj.helpdoc[Locale[ClientItems[item]._id + " Name"]] = Locale[ClientItems[item]._id + " Name"] + str
            }
        }
        VFS.writeFile(`${ModPath}Ammoobj.json`, JSON.stringify(Ammoobj, null, 4))
        //"SpawnedInSession": true
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
        AddAssort(Therapist, "5a29357286f77409c705e025", 1, 1)
    }
}
module.exports = { mod: new Mod() }