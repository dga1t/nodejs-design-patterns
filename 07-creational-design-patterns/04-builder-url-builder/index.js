import { UrlBuilder } from './urlBuilder.js'

// This example demonstrate how to use the builder pattern to simplify the creation of Url object.

const url = new UrlBuilder()
  .setProtocol('https')
  .setAuthentication('user', 'pass')
  .setHostname('example.com')
  .build()

console.log(url.toString())