import {enumMap} from './enumMap'
export let createAssetObjFromContract = async (contractItem) => {
    let assetObj = {};
    assetObj.ID = contractItem['0']
    assetObj.name = contractItem['1']
    assetObj.symbol = contractItem['2']
    assetObj.decimals = contractItem['3']
    assetObj.totalSupply = contractItem['4']
    assetObj.tokenPrice = contractItem['5']
    assetObj.verificationStatus = contractItem['6']
    assetObj.category = enumMap.category[contractItem['7']]
    assetObj.description = contractItem['8']
    assetObj.images = await Promise.all(contractItem['9'].map(async (item) => {
        return await item
    }))
    assetObj.supportingDocuments = await Promise.all(contractItem['10'].map(async (item) => {
        return await item
    }))
    assetObj.creator = contractItem['11']
    return assetObj;
}





export let createUserObjFromContract = async (contractItem) => {
    let userObj = {};
    userObj.isAdmin = contractItem['0']
    userObj.isRegistered = contractItem['1']
    userObj.isBanned = contractItem['2']
    userObj.userAddress = contractItem['4']


    return userObj;
}


export let createAdminUserObjFromContract = async (contractItem) => {
    console.log('admin data from contarct',contractItem)
    let userObj = {};
    userObj.isAdmin = contractItem['0']
    userObj.isRegistered = contractItem['1']
    userObj.isBanned = contractItem['2']
    userObj.userAddress = contractItem['4']


    return userObj;
}
