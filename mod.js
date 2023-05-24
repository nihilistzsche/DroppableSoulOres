const miscFilename = 'global\\excel\\misc.txt'
const misc = D2RMM.readTsv(miscFilename)

// dropable soul ores
// remove Soul ores from merchants
misc.rows.forEach(item=>{
  if (item['type'] == 'sore') {
    item['AkaraMin']=0;
    item['AkaraMax']=0;
    item['FaraMin']=0;
    item['FaraMax']=0;
    item['LysanderMin']=0;
    item['LysanderMax']=0;
    item['DrognanMin']=0;
    item['DrognanMax']=0;
    item['HratliMin']=0;
    item['HratliMax']=0;
    item['AlkorMin']=0;
    item['AlkorMax']=0;
    item['OrmusMin']=0;
    item['OrmusMax']=0;
    item['ElzixMin']=0;
    item['ElzixMax']=0;
    item['AshearaMin']=0;
    item['AshearaMax']=0;
    item['CainMin']=0;
    item['CainMax']=0;
    item['HalbuMin']=0;
    item['HalbuMax']=0;
    item['MalahMin']=0;
    item['MalahMax']=0;
    item['LarzukMin']=0;
    item['LarzukMax']=0;
    item['AnyaMin']=0;
    item['AnyaMax']=0;
    item['JamellaMin']=0;
    item['JamellaMax']=0;
    item['PermStoreItem']=0;
    item['PermStoreItem']=0
  }
});
D2RMM.writeTsv(miscFilename, misc);


function isArray(arg) {
    return typeof arg.push === 'function';
  };

// get all soul ores
let tresaureSets = misc.rows.filter(item=>item['type']==='sore');;
// split until 10 elements in array
batch = (items, batchSize) => {
    const batches = [];
    while (items.length) {
        batches.push(items.splice(0, batchSize));
    }
    return batches;
}
while (tresaureSets.length> 10) {
  tresaureSets = batch(tresaureSets, 10);
}

function count(itemOrArray) {
    if (isArray(itemOrArray)) {
        return itemOrArray.reduce((acc, item) => acc + count(item), 0);
    }
    return 1;
}

const SoulOreTreasureClasses = [];
function generateTreasureClass(treasureSet, prefix='SoulOres') {
    let tc = {
        'Treasure Class': prefix,
        'Picks':1
    }
    for (let i = 0; i < treasureSet.length; i++) {
       
        if (isArray(treasureSet[i])) {
          const tcName = `${prefix}_${i}`;
            generateTreasureClass(treasureSet[i], tcName);
            tc[`Item${i}`] = tcName;
            tc[`Prob${i}`] = count(treasureSet[i])
        }else{
            tc[`Item${i}`] = treasureSet[i].code;
            tc[`Prob${i}`] = 1;
        }
       
    }
    SoulOreTreasureClasses.unshift(tc)
}
generateTreasureClass(tresaureSets)

const treasureclassexFilename = 'global\\excel\\treasureclassex.txt';
const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
// add soul ores treasure class
SoulOreTreasureClasses.forEach(tc=>{
  treasureclassex.rows.unshift(tc);
});
// atach soul ores to runes drop
treasureclassex.rows.forEach(tc=>{
  if (tc['Treasure Class'].startsWith('Rune')) {
    if(tc['Item3']==''){
      tc['Item3']='SoulOres'
      tc['Prob3']=1
      return
    }
    if(tc['Item4']==''){
      tc['Item4']='SoulOres'
      tc['Prob4']=1
    }
  }
  if (tc['Treasure Class'].endsWith('Gem')) {
    if(tc['Item7']==''){
      tc['Item7']='SoulOres'
      tc['Prob7']=1
      return
    }
    if(tc['Item8']==''){
      tc['Item8']='SoulOres'
      tc['Prob8']=1
    }
  }
 
});


D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
