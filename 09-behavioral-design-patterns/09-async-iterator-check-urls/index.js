import { CheckUrls } from './checkUrls.js'

// This sample demonstrates how to use a generator in place of a standard iterator.

async function main () {
  const checkUrls = new CheckUrls([
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://mustbedownforsurehopefully.com'
  ])

  for await (const status of checkUrls) {
    console.log(status)
  }
}

main()