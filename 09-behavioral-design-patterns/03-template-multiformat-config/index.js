import { JsonConfig } from './jsonConfig.js'
import { IniConfig } from './iniConfig.js'

// This sample demonstrates how to use the Template pattern to create different configuration managers supporting different file formats.

async function main () {
  const jsonConfig = new JsonConfig()
  await jsonConfig.load('samples/conf.json')
  jsonConfig.set('nodejs', 'design patterns')
  await jsonConfig.save('samples/conf_mod.json')

  const iniConfig = new IniConfig()
  await iniConfig.load('samples/conf.ini')
  iniConfig.set('nodejs', 'design patterns')
  await iniConfig.save('samples/conf_mod.ini')
}

main()